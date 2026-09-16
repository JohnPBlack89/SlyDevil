param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[a-z0-9][a-z0-9_-]*$')]
    [string]$DockerUsername,
    [ValidatePattern('^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$')]
    [string]$Tag = (Get-Date -Format 'yyyyMMdd-HHmmss'),
    [switch]$Push,
    [switch]$Deploy
)

$ErrorActionPreference = 'Stop'
if ($Deploy -and -not $Push) { throw 'Use -Push with -Deploy so the image is uploaded before deployment.' }
if ($Deploy -and -not $env:RENDER_DEPLOY_HOOK_URL) { throw 'Set RENDER_DEPLOY_HOOK_URL to your service deploy hook before using -Deploy.' }
if ($Deploy -and $env:RENDER_DEPLOY_HOOK_URL -notmatch '^https://api\.render\.com/deploy/') { throw 'The deploy hook must be an HTTPS Render deploy URL.' }

$projectRoot = Split-Path -Parent $PSScriptRoot
$image = "docker.io/${DockerUsername}/sly-devil"
Push-Location $projectRoot
try {
    # The Dockerfile runs the rule tests before producing the runtime image.
    & docker build --platform linux/amd64 --tag "${image}:${Tag}" --tag "${image}:latest" .
    if ($LASTEXITCODE -ne 0) { throw 'Docker build or rule tests failed. Nothing was published.' }

    if ($Push) {
        & docker push "${image}:${Tag}"
        if ($LASTEXITCODE -ne 0) { throw 'Versioned image upload failed. Deployment was not triggered.' }
        & docker push "${image}:latest"
        if ($LASTEXITCODE -ne 0) { throw 'Latest image upload failed. Deployment was not triggered.' }
    }

    if ($Deploy) {
        $separator = if ($env:RENDER_DEPLOY_HOOK_URL.Contains('?')) { '&' } else { '?' }
        $encodedImage = [Uri]::EscapeDataString("${image}:${Tag}")
        $deployUrl = "${env:RENDER_DEPLOY_HOOK_URL}${separator}imgURL=${encodedImage}"
        try { $null = Invoke-RestMethod -Method Post -Uri $deployUrl }
        catch { throw 'Render rejected the deployment request. Check your service deploy hook and image settings.' }
        Write-Host 'Render deployment requested. Check the Render dashboard for completion.'
    }
    Write-Host "Image: ${image}:${Tag}"
} finally {
    Pop-Location
}
