#!/bin/bash
set -euo pipefail

# Usage:
#   sudo ./scripts/vps-setup-static-site.sh <site-slug> <domain> [www-domain]
#
# Example:
#   sudo ./scripts/vps-setup-static-site.sh pest-control usa-pest-control-quote.com www.usa-pest-control-quote.com

SITE_SLUG="${1:-}"
DOMAIN="${2:-}"
WWW_DOMAIN="${3:-}"

if [ -z "$SITE_SLUG" ] || [ -z "$DOMAIN" ]; then
  echo "Usage: sudo $0 <site-slug> <domain> [www-domain]"
  exit 1
fi

ROOT_DIR="/var/www/${SITE_SLUG}-static"
CONF_PATH="/etc/nginx/sites-available/${SITE_SLUG}.conf"
LINK_PATH="/etc/nginx/sites-enabled/${SITE_SLUG}.conf"

echo "→ Create web root: ${ROOT_DIR}"
mkdir -p "${ROOT_DIR}"

echo "→ Write nginx vhost: ${CONF_PATH}"
SERVER_NAMES="${DOMAIN}"
if [ -n "$WWW_DOMAIN" ]; then
  SERVER_NAMES="${SERVER_NAMES} ${WWW_DOMAIN}"
fi

cat > "${CONF_PATH}" <<EOF
server {
  listen 80;
  listen [::]:80;

  server_name ${SERVER_NAMES};

  root ${ROOT_DIR};
  index index.html;

  location / {
    try_files \$uri \$uri/ \$uri/index.html =404;
  }

  location ~* \\\\.(?:css|js|mjs|map|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
    try_files \$uri =404;
  }
}
EOF

echo "→ Enable site"
ln -sf "${CONF_PATH}" "${LINK_PATH}"

echo "→ Nginx config test + reload"
nginx -t
systemctl reload nginx

echo "✓ Nginx site ready on HTTP"
echo "Next (optional): install TLS with certbot."

