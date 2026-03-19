#!/bin/bash
set -e

SITE=$1
VPS="root@187.124.147.244"

if [ -z "$SITE" ]; then
  echo "Usage: ./scripts/deploy.sh <site-slug>"
  exit 1
fi

REMOTE_DIR="/var/www/${SITE}-static"

# Prefer Windows OpenSSH (same keys/config as PowerShell ssh).
SSH_BIN="ssh"
SCP_BIN="scp"
if command -v ssh.exe >/dev/null 2>&1; then
  SSH_BIN="ssh.exe"
fi
if command -v scp.exe >/dev/null 2>&1; then
  SCP_BIN="scp.exe"
fi

echo "→ Build $SITE..."
rm -rf .next out
SITE_SLUG=$SITE npm run build

echo "→ Deploy vers $VPS:$REMOTE_DIR..."
${SSH_BIN} $VPS "mkdir -p $REMOTE_DIR"
${SSH_BIN} $VPS "rm -rf $REMOTE_DIR/*"
${SCP_BIN} -r out/* $VPS:$REMOTE_DIR/

echo "→ Reload Nginx..."
${SSH_BIN} $VPS "systemctl reload nginx"

echo "✓ Deploy $SITE terminé"
