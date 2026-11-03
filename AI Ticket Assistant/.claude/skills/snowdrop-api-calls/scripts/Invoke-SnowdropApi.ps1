<#
.SYNOPSIS
    Call a Snowdrop / Unlimited Financials Azure-hosted web API through the ingress, using
    cookie-based auth (SharpAuth + SharpOrg).

.DESCRIPTION
    Builds the URL (https://<ApiHost><Path>), attaches the SharpAuth/SharpOrg session cookie plus a full
    browser-fingerprint header set, issues the request via curl.exe, and prints the status code plus
    pretty-printed JSON.

    You can supply the location either as -ApiHost + -Path, or as a full -Url.
    You can supply auth either as -SharpAuth + -SharpOrg (+ -OrganizationId), or as a pre-built -Cookie
    string.

    IMPORTANT: -Path must be the FULL confirmed external path, exactly as documented in
    references/auth-and-ingress.md's per-service table. There is no universal "/snowdrop/<service>/"
    prefix - some services use it (e.g. remittanceprocessing, resources), others use a flat path with
    no prefix at all (e.g. guarantors, patients, payers, remittance, charge-masters, plans-search).
    This script does NOT guess which pattern applies - check the table first, then pass the exact path.

    WHY curl.exe INSTEAD OF Invoke-WebRequest (confirmed 2026-08-12, UF-15759): the WAF in front of these
    environments rejects requests made via PowerShell's Invoke-WebRequest with a bare nginx
    "401 Authorization Required" even with a byte-for-byte correct, unexpired SharpAuth/SharpOrg cookie -
    while curl.exe, given the identical cookie and a browser-fingerprint header set (Origin, Referer,
    User-Agent, sec-fetch-*, sec-ch-ua*, accept-language, priority, org-id-req, and per-request
    request-id/x-instana-l/s/t tracing ids), succeeds. This points to something below the HTTP layer
    (most likely TLS/JA3 handshake fingerprinting distinguishing .NET's HTTP stack from a real browser
    or curl), which no amount of header-matching from Invoke-WebRequest can work around. See
    references/waf-and-curl.md for the full story and troubleshooting steps if this stops working again.

.PARAMETER ApiHost
    Environment host, e.g. "api.unlimitedfinancials.ninja". Confirm the host for non-ninja environments.

.PARAMETER Path
    Full external path, starting with "/", exactly as confirmed for that service - e.g.
    "/snowdrop/remittanceprocessing/transfer-targets/{id}" (prefix-rewrite pattern) or
    "/guarantors/{id}" (flat passthrough pattern). See auth-and-ingress.md for the confirmed table.

.PARAMETER Url
    Full URL (alternative to ApiHost/Path).

.PARAMETER SharpAuth
    The SharpAuth JWT from a logged-in browser session (short-lived, ~45 min). Set this into a variable
    once per session rather than re-pasting the long token into every command:
        $SharpAuth = "eyJhbGci..."
        ./Invoke-SnowdropApi.ps1 -ApiHost ... -Path ... -SharpOrg "<org>" -SharpAuth $SharpAuth

.PARAMETER SharpOrg
    The acting organization GUID (SharpOrg cookie). Data is scoped to this org.

.PARAMETER OrganizationId
    Value sent in the "org-id-req" header the SPA sends alongside the cookie (confirmed required
    2026-08-12 - requests without it still 401 even with a valid cookie). Defaults to -SharpOrg if not
    given separately, since they're almost always the same value.

.PARAMETER Cookie
    A pre-built cookie string (alternative to SharpAuth/SharpOrg), e.g. "SharpOrg=...; SharpAuth=...".

.PARAMETER Method
    HTTP method. Default GET.

.PARAMETER Body
    Optional request body (object or JSON string) for POST/PUT/PATCH. Objects are serialized to JSON.

.EXAMPLE
    # Prefix-rewrite service (remittanceprocessing uses /snowdrop/<service>/...)
    $SharpAuth = "eyJhbGci..."
    ./Invoke-SnowdropApi.ps1 -ApiHost "api.unlimitedfinancials.uno" `
        -Path "/snowdrop/remittanceprocessing/remittances/007bcbe7-a44a-4cd5-8dbe-2823ae946d8a" `
        -SharpOrg "852756eb-73b2-4c46-b0f0-c8ec4d29acde" -SharpAuth $SharpAuth

.EXAMPLE
    # Flat-passthrough service (guarantors has no /snowdrop/ prefix)
    ./Invoke-SnowdropApi.ps1 -ApiHost "api.unlimitedfinancials.ninja" `
        -Path "/guarantors/007bcbe7-a44a-4cd5-8dbe-2823ae946d8a" `
        -SharpOrg "<ORG>" -SharpAuth $SharpAuth

.EXAMPLE
    ./Invoke-SnowdropApi.ps1 -Url "https://api.unlimitedfinancials.ninja/charge-masters/behaviors" -Cookie $env:SNOWDROP_COOKIE
#>
[CmdletBinding(DefaultParameterSetName = "Parts")]
param(
    [Parameter(ParameterSetName = "Parts")] [string] $ApiHost,
    [Parameter(ParameterSetName = "Parts")] [string] $Path,

    [Parameter(ParameterSetName = "FullUrl", Mandatory = $true)] [string] $Url,

    [string] $SharpAuth,
    [string] $SharpOrg,
    [string] $OrganizationId,
    [string] $Cookie,

    [string] $Method = "GET",
    $Body
)

# --- Resolve URL ---
if ($PSCmdlet.ParameterSetName -eq "Parts") {
    foreach ($p in @("ApiHost", "Path")) {
        if ([string]::IsNullOrWhiteSpace((Get-Variable $p).Value)) {
            throw "Provide -ApiHost and -Path (the full confirmed external path, e.g. '/guarantors/{id}' or '/snowdrop/remittanceprocessing/{route}' - see auth-and-ingress.md), or use -Url."
        }
    }
    $normalizedPath = if ($Path.StartsWith("/")) { $Path } else { "/$Path" }
    $Url = "https://$ApiHost$normalizedPath"
}

if ($Url -match "snowdrop-[a-z]+-services\.") {
    Write-Warning "URL looks like the swagger 'servers' internal address, not a real ingress path. Check references/auth-and-ingress.md for the confirmed external path for this service."
}

if (-not $ApiHost) {
    $ApiHost = ([uri]$Url).Host
}

# --- Resolve cookie ---
if ([string]::IsNullOrWhiteSpace($Cookie)) {
    if ([string]::IsNullOrWhiteSpace($SharpAuth) -or [string]::IsNullOrWhiteSpace($SharpOrg)) {
        throw "Provide -Cookie, or both -SharpAuth and -SharpOrg."
    }
    $Cookie = "SharpOrg=$SharpOrg; SharpAuth=$SharpAuth"
}
if ([string]::IsNullOrWhiteSpace($OrganizationId)) {
    $OrganizationId = $SharpOrg
}

# Browser-fingerprint headers required to get past the WAF (see .DESCRIPTION). Static/session-level
# headers here; request-id and x-instana-l/s/t are regenerated per call below since a real browser
# mints fresh values for those on every request.
$spaHost = $ApiHost -replace '^api\.', 'sd.'
$baseHeaders = @{
    "Cookie"             = $Cookie
    "Accept"             = "application/json, text/plain, */*"
    "accept-language"    = "en-US,en;q=0.9"
    "Origin"             = "https://$spaHost"
    "Referer"            = "https://$spaHost/"
    "priority"           = "u=1, i"
    "sec-ch-ua"          = '"Not=A?Brand";v="99", "Google Chrome";v="151", "Chromium";v="151"'
    "sec-ch-ua-mobile"   = "?0"
    "sec-ch-ua-platform" = '"Windows"'
    "sec-fetch-dest"     = "empty"
    "sec-fetch-mode"     = "cors"
    "sec-fetch-site"     = "same-site"
    "User-Agent"         = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36"
}
if ($OrganizationId) {
    $baseHeaders["org-id-req"] = $OrganizationId
} else {
    Write-Warning "No -OrganizationId/-SharpOrg given, so the 'org-id-req' header won't be sent. This has been observed to cause a 401 even with a valid cookie."
}

function New-RequestHeaders {
    $h = $baseHeaders.Clone()
    $h["request-id"] = [guid]::NewGuid().ToString()
    $instanaId = -join ((1..16) | ForEach-Object { "{0:x}" -f (Get-Random -Maximum 16) })
    $h["x-instana-l"] = "1,correlationType=web;correlationId=$instanaId"
    $h["x-instana-s"] = $instanaId
    $h["x-instana-t"] = $instanaId
    return $h
}

function Escape-CurlConfigValue {
    param([string] $Value)
    # curl's -K config file uses double-quoted values with backslash escaping for embedded " and \.
    # Some headers here (sec-ch-ua) contain literal double quotes, which breaks passing arguments
    # directly to curl.exe's argv on Windows (confirmed 2026-08-12: "curl: (3) URL rejected: Malformed
    # input to a URL function" from a mangled argument). A config file sidesteps Windows command-line
    # argument escaping entirely.
    # Also strip CR/LF: a value containing a literal newline (e.g. non-Compress ConvertTo-Json output)
    # would otherwise split this config line across multiple physical lines, which curl then parses as
    # extra, garbage config options - "config file option '' is unknown" (hit 2026-08-12 on a POST
    # body's pretty-printed JSON; fixed at the source below too, but this is a defensive backstop).
    return ($Value -replace '\\', '\\\\' -replace '"', '\"' -replace '\r?\n', ' ')
}

function Invoke-ApiCall {
    param(
        [Parameter(Mandatory = $true)] [string] $Uri,
        [Parameter(Mandatory = $true)] [hashtable] $Headers,
        [string] $Method = "GET",
        [string] $Body,
        [string] $ContentType
    )

    $marker = "___HTTP_STATUS___"
    $configLines = @()
    $configLines += "url = `"$(Escape-CurlConfigValue $Uri)`""
    $configLines += "request = `"$Method`""
    $configLines += "silent"
    $configLines += "show-error"
    $configLines += "max-time = 60"
    foreach ($key in $Headers.Keys) {
        $headerLine = "${key}: $($Headers[$key])"
        $configLines += "header = `"$(Escape-CurlConfigValue $headerLine)`""
    }
    if ($ContentType) {
        $configLines += "header = `"$(Escape-CurlConfigValue "Content-Type: $ContentType")`""
    }
    if ($Body) {
        $configLines += "data-raw = `"$(Escape-CurlConfigValue $Body)`""
    }
    $configLines += "write-out = `"$marker%{http_code}`""

    $configPath = Join-Path ([System.IO.Path]::GetTempPath()) "curlcfg_$([guid]::NewGuid()).txt"
    try {
        # Contains the live SharpAuth cookie - write, use, delete immediately, never left behind.
        # ASCII (not utf8) deliberately: Windows PowerShell 5.1's -Encoding utf8 always writes a BOM,
        # which curl's config parser doesn't strip and misreads as part of the first option name
        # (confirmed 2026-08-12). Every value here (JWT, GUIDs, header names, the quoted sec-ch-ua
        # string) is plain ASCII, so this is safe.
        Set-Content -Path $configPath -Value $configLines -Encoding ascii

        $rawOutput = & curl.exe -K $configPath 2>&1
        $outputStr = ($rawOutput -join "`n")

        $splitIndex = $outputStr.LastIndexOf($marker)
        if ($splitIndex -lt 0) {
            throw "curl.exe call failed or returned unexpected output: $outputStr"
        }
        $content = $outputStr.Substring(0, $splitIndex)
        $statusText = $outputStr.Substring($splitIndex + $marker.Length).Trim()
        $statusCode = 0
        [void][int]::TryParse($statusText, [ref]$statusCode)

        return [pscustomobject]@{ StatusCode = $statusCode; Content = $content }
    } finally {
        if (Test-Path $configPath) { Remove-Item $configPath -Force }
    }
}

# --- Make the call ---
$requestBody = $null
$contentType = $null
if ($null -ne $Body) {
    $requestBody = if ($Body -is [string]) { $Body } else { $Body | ConvertTo-Json -Depth 12 -Compress }
    $contentType = "application/json"
}

Write-Host "$Method $Url"
$resp = Invoke-ApiCall -Uri $Url -Headers (New-RequestHeaders) -Method $Method -Body $requestBody -ContentType $contentType
Write-Host "Status: $($resp.StatusCode)"

if ([string]::IsNullOrWhiteSpace($resp.Content)) {
    Write-Host "(empty body)"
    return
}

try {
    $resp.Content | ConvertFrom-Json | ConvertTo-Json -Depth 12
} catch {
    # Not JSON - print raw.
    $resp.Content
}
