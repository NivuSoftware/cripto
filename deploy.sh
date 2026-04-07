#!/bin/bash
# deploy.sh — Script de deploy para hablemoscripto.com
# Uso: sudo bash deploy.sh
set -e

DOMAIN="hablemoscripto.com"
REPO="https://github.com/NivuSoftware/cripto.git"
APP_DIR="/opt/cripto"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info()    { echo -e "${GREEN}[INFO]${NC} $1"; }
warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
error()   { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }
pause()   { echo -e "\n${YELLOW}[ACCION REQUERIDA]${NC} $1\nPresiona ENTER cuando hayas terminado..."; read -r; }

# ─── 1. DOCKER ───────────────────────────────────────────────────────────────
info "Instalando Docker..."
if ! command -v docker &>/dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
else
    info "Docker ya instalado: $(docker --version)"
fi

# ─── 2. CERTBOT (antes de levantar Docker, necesita puerto 80 libre) ─────────
info "Instalando Certbot..."
apt-get install -y certbot

if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    info "Obteniendo certificado SSL para $DOMAIN..."
    certbot certonly --standalone \
        --non-interactive \
        --agree-tos \
        --register-unsafely-without-email \
        -d "$DOMAIN" \
        -d "www.$DOMAIN"
    info "Certificado SSL obtenido."
else
    info "Certificado SSL ya existe, omitiendo."
fi

# ─── 3. REPO ─────────────────────────────────────────────────────────────────
if [ -d "$APP_DIR/.git" ]; then
    info "Actualizando repo existente en $APP_DIR..."
    git -C "$APP_DIR" pull origin main
else
    info "Clonando repo en $APP_DIR..."
    git clone "$REPO" "$APP_DIR"
fi

cd "$APP_DIR"

# ─── 4. ARCHIVO .env.prod ────────────────────────────────────────────────────
if [ ! -f ".env.prod" ]; then
    cp .env.prod.example .env.prod
    warn "Archivo .env.prod creado desde el ejemplo."
    pause "Abre OTRO terminal y edita el archivo:\n  nano $APP_DIR/.env.prod\n\nCompleta TODOS los valores marcados con CAMBIAR_POR_..."
fi

# Verificar que no queden valores sin completar
if grep -q "CAMBIAR_POR" .env.prod; then
    error "El archivo .env.prod tiene valores sin completar. Edita $APP_DIR/.env.prod antes de continuar."
fi

info ".env.prod validado correctamente."

# ─── 5. RENOVACION AUTOMATICA DE SSL ─────────────────────────────────────────
info "Configurando renovacion automatica del certificado SSL..."
if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
    (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --deploy-hook 'docker compose -f $APP_DIR/docker-compose.prod.yml restart frontend'") | crontab -
    info "Cron de renovacion SSL creado."
fi

# ─── 6. LEVANTAR STACK ───────────────────────────────────────────────────────
info "Construyendo y levantando contenedores..."
docker compose -f docker-compose.prod.yml up -d --build

info "Esperando que los servicios inicien..."
sleep 10

# ─── 7. VERIFICACION ─────────────────────────────────────────────────────────
info "Verificando estado de contenedores..."
docker compose -f docker-compose.prod.yml ps

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Deploy completado exitosamente!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "  Sitio:       https://$DOMAIN"
echo -e "  Admin:       https://$DOMAIN/acceso-admin"
echo -e "  Logs:        docker compose -f $APP_DIR/docker-compose.prod.yml logs -f"
echo ""
