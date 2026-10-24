#!/usr/bin/env bash
# Creates (or updates) the Azure Static Web App for 5spicemarket.com and
# connects GitHub Actions to it. Safe to re-run: existing resources are reused.
#
# Usage:
#   ./infra/setup-azure.sh --subscription <SUBSCRIPTION_ID> [--site-mode live|coming_soon] [--sku Free|Standard]
#
# Needs: Azure CLI (az). Optional: GitHub CLI (gh), so the script can set the
# GitHub secret and variables for you. Without gh it prints what to set.
# See infra/README.md for the full walkthrough.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=config.env
source "$SCRIPT_DIR/config.env"

SUBSCRIPTION="${AZURE_SUBSCRIPTION_ID:-}"
SITE_MODE="live"

usage() {
  sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --subscription) SUBSCRIPTION="${2:-}"; shift 2 ;;
    --site-mode)    SITE_MODE="${2:-}"; shift 2 ;;
    --sku)          SKU="${2:-}"; shift 2 ;;
    -h|--help)      usage 0 ;;
    *) echo "Unknown option: $1" >&2; usage 1 ;;
  esac
done

step() { printf '\n\033[1;33m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[0;32m    %s\033[0m\n' "$*"; }
fail() { printf '\033[0;31mError: %s\033[0m\n' "$*" >&2; exit 1; }

[[ -n "$SUBSCRIPTION" ]] || fail "pass --subscription <SUBSCRIPTION_ID> (or set AZURE_SUBSCRIPTION_ID)."
[[ "$SITE_MODE" == "live" || "$SITE_MODE" == "coming_soon" ]] || fail "--site-mode must be live or coming_soon."
[[ "$SKU" == "Free" || "$SKU" == "Standard" ]] || fail "--sku must be Free or Standard."
command -v az >/dev/null 2>&1 || fail "Azure CLI not found. Install it: brew install azure-cli"

# shellcheck disable=SC2206
TAG_ARGS=($TAGS)

step "Signing in to Azure"
if ! az account show >/dev/null 2>&1; then
  az login >/dev/null
fi
az account set --subscription "$SUBSCRIPTION"
ok "Using subscription: $(az account show --query name -o tsv) ($SUBSCRIPTION)"

step "Registering the Microsoft.Web provider (one-time per subscription)"
az provider register --namespace Microsoft.Web --wait >/dev/null
ok "Registered"

step "Resource group $RESOURCE_GROUP ($LOCATION)"
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --tags "${TAG_ARGS[@]}" >/dev/null
ok "Ready"

step "Static Web App $APP_NAME ($SKU plan)"
if az staticwebapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" >/dev/null 2>&1; then
  az staticwebapp update --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --sku "$SKU" >/dev/null
  ok "Already exists; plan set to $SKU"
else
  # No --source: deployments come from our own GitHub Actions workflow
  # (.github/workflows/azure-static-web-apps.yml) using a deployment token.
  az staticwebapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --sku "$SKU" \
    --tags "${TAG_ARGS[@]}" >/dev/null
  ok "Created"
fi

DEFAULT_HOSTNAME="$(az staticwebapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --query defaultHostname -o tsv)"
ok "Temporary address: https://$DEFAULT_HOSTNAME"

step "Connecting GitHub Actions ($GITHUB_REPO)"
DEPLOY_TOKEN="$(az staticwebapp secrets list --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --query properties.apiKey -o tsv)"
[[ -n "$DEPLOY_TOKEN" ]] || fail "could not read the deployment token."

if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  # The token goes in through stdin, so it never appears in the terminal or shell history.
  printf '%s' "$DEPLOY_TOKEN" | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --repo "$GITHUB_REPO"
  gh variable set VITE_APP_SITE_MODE --repo "$GITHUB_REPO" --body "$SITE_MODE"
  gh variable set AZURE_SWA_ENABLED --repo "$GITHUB_REPO" --body "true"
  ok "Set secret AZURE_STATIC_WEB_APPS_API_TOKEN"
  ok "Set variable VITE_APP_SITE_MODE=$SITE_MODE"
  ok "Set variable AZURE_SWA_ENABLED=true"
  GITHUB_DONE=1
else
  GITHUB_DONE=0
fi
unset DEPLOY_TOKEN

step "Done"
cat <<EOF
    Static Web App : $APP_NAME ($SKU plan)
    Resource group : $RESOURCE_GROUP
    Temporary URL  : https://$DEFAULT_HOSTNAME
EOF

if [[ "$GITHUB_DONE" == "0" ]]; then
  cat <<EOF

    GitHub CLI isn't installed or signed in, so set these by hand in
    GitHub -> $GITHUB_REPO -> Settings -> Secrets and variables -> Actions:

      Secret    AZURE_STATIC_WEB_APPS_API_TOKEN  = (the deployment token; see below)
      Variable  VITE_APP_SITE_MODE               = $SITE_MODE
      Variable  AZURE_SWA_ENABLED                = true

    To show the deployment token (keep it private; it allows deploys):
      az staticwebapp secrets list --name $APP_NAME --resource-group $RESOURCE_GROUP --query properties.apiKey -o tsv
EOF
fi

cat <<EOF

    Next:
      1. Trigger a deploy: push to main, or re-run the latest
         "Azure Static Web Apps" workflow in GitHub -> Actions.
      2. Check https://$DEFAULT_HOSTNAME (try /catering and refresh it).
      3. Then connect the domain: ./infra/add-custom-domain.sh www.5spicemarket.com
EOF
