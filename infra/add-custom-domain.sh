#!/usr/bin/env bash
# Connects a custom domain to the Static Web App. Run it after setup-azure.sh,
# once the site works on its temporary *.azurestaticapps.net address.
#
# Usage:
#   ./infra/add-custom-domain.sh www.5spicemarket.com   # subdomain (CNAME): do this first
#   ./infra/add-custom-domain.sh 5spicemarket.com       # root/apex domain (TXT check + ALIAS)
#
# Options: --subscription <SUBSCRIPTION_ID> (or set AZURE_SUBSCRIPTION_ID)
# The script shows the exact DNS records to create at your DNS provider and
# waits for you to add them. Azure issues the free SSL certificate itself.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=config.env
source "$SCRIPT_DIR/config.env"

SUBSCRIPTION="${AZURE_SUBSCRIPTION_ID:-}"
HOSTNAME_ARG=""

usage() {
  sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --subscription) SUBSCRIPTION="${2:-}"; shift 2 ;;
    -h|--help)      usage 0 ;;
    -*) echo "Unknown option: $1" >&2; usage 1 ;;
    *)  HOSTNAME_ARG="$1"; shift ;;
  esac
done

step() { printf '\n\033[1;33m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[0;32m    %s\033[0m\n' "$*"; }
fail() { printf '\033[0;31mError: %s\033[0m\n' "$*" >&2; exit 1; }
pause() { read -r -p "    Press Enter once the DNS record is saved (changes can take a few minutes)... " _; }

[[ -n "$HOSTNAME_ARG" ]] || usage 1
command -v az >/dev/null 2>&1 || fail "Azure CLI not found. Install it: brew install azure-cli"
az account show >/dev/null 2>&1 || az login >/dev/null
[[ -z "$SUBSCRIPTION" ]] || az account set --subscription "$SUBSCRIPTION"

HOST="$(printf '%s' "$HOSTNAME_ARG" | tr '[:upper:]' '[:lower:]')"
DEFAULT_HOSTNAME="$(az staticwebapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --query defaultHostname -o tsv)" \
  || fail "Static Web App $APP_NAME not found. Run ./infra/setup-azure.sh first."

# A hostname with exactly one dot (e.g. 5spicemarket.com) is the root/apex domain.
DOTS="${HOST//[^.]/}"
if [[ ${#DOTS} -ge 2 ]]; then
  SUB="${HOST%%.*}"
  step "Subdomain $HOST (CNAME)"
  cat <<EOF
    At your DNS provider, create:

      Type   Name/Host   Value
      CNAME  $SUB         $DEFAULT_HOSTNAME

    If a record for "$SUB" already exists (e.g. pointing to Vercel), edit it
    instead. Visitors switch to Azure as soon as this change spreads.
EOF
  pause
  step "Validating $HOST with Azure (this can take a few minutes)"
  az staticwebapp hostname set --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --hostname "$HOST" >/dev/null
  ok "$HOST is connected. SSL is issued automatically; allow up to an hour."
else
  step "Root domain $HOST (TXT check, then ALIAS)"
  az staticwebapp hostname set --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" \
    --hostname "$HOST" --validation-method dns-txt-token --no-wait >/dev/null

  TOKEN=""
  for _ in $(seq 1 30); do
    TOKEN="$(az staticwebapp hostname show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" \
      --hostname "$HOST" --query validationToken -o tsv 2>/dev/null || true)"
    [[ -n "$TOKEN" ]] && break
    sleep 10
  done
  [[ -n "$TOKEN" ]] || fail "Azure didn't return a validation code yet. Re-run this script in a few minutes."

  cat <<EOF
    1) Prove you own the domain. At your DNS provider, create:

      Type   Name/Host   Value
      TXT    _dnsauth    $TOKEN

       (The Azure portal shows the same values under Static Web App ->
        Custom domains, if your provider labels fields differently.)
EOF
  pause
  step "Waiting for Azure to validate $HOST"
  for _ in $(seq 1 60); do
    STATUS="$(az staticwebapp hostname show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" \
      --hostname "$HOST" --query status -o tsv 2>/dev/null || true)"
    [[ "$STATUS" == "Ready" ]] && break
    printf '    status: %s\n' "${STATUS:-pending}"
    sleep 20
  done
  [[ "$STATUS" == "Ready" ]] || fail "Not validated yet (status: ${STATUS:-unknown}). Check the TXT record, then re-run."
  ok "Ownership confirmed"

  cat <<EOF

    2) Send visitors to Azure. Point the root domain at the site with one of:

      Type                 Name/Host   Value
      ALIAS or ANAME       @           $DEFAULT_HOSTNAME
      CNAME (flattened)    @           $DEFAULT_HOSTNAME   (e.g. Cloudflare)

       Replace the existing @ record that points to Vercel. If your provider
       supports none of these (e.g. GoDaddy), the simplest fix is to redirect
       $HOST to www.$HOST at your provider and use www as the main address.
EOF
  ok "Once that record is live, $HOST serves from Azure with free SSL."
fi
