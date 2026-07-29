# SchoolMitra Production Deployment Runbook

Comprehensive guide for provisioning, deploying, scaling, and maintaining the **SchoolMitra Unified Monorepo Platform** in production.

---

## Architecture Stack Overview

| Service Layer | Technology | Port / Container | Notes |
| :--- | :--- | :--- | :--- |
| **API Server & Telemetry** | Node.js, Express, Socket.IO | `5000` / `schoolmitra-backend` | Multi-tenant REST & WebSocket Engine |
| **School ERP Admin** | Next.js 14, React, Tailwind | `3000` / `schoolmitra-school-admin` | Multi-tenant School Admin |
| **Parent Mobile PWA** | Next.js 14, PWA Manifest | `3002` / `schoolmitra-parent-app` | Parent Cockpit & Live Bus Tracking |
| **Driver Cockpit** | Next.js 14, PWA | `3003` / `schoolmitra-driver-app` | Driver Navigation & RFID Taps |
| **Super Admin SaaS** | Next.js 14, React | `3004` / `schoolmitra-super-admin` | SaaS HQ Command Center |
| **Marketing Website** | Next.js 14, React | `3005` / `schoolmitra-website` | Public Landing & Lead Generation |
| **Gateway & SSL** | Nginx Alpine, Certbot | `80` / `443` / `schoolmitra-gateway` | Rate Limiting, SSL, WebSocket Upgrade |

---

## 1. Environment Variables Checklist (`.env`)

Create a `.env` file at the root of the project:

```env
# Server Runtime
NODE_ENV=production
PORT=5000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://admin:<password>@schoolmitra.mongodb.net/production?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=super_secret_production_jwt_key_2026_x89a
JWT_REFRESH_SECRET=super_secret_production_refresh_key_2026_z12b

# Frontend Public API Target
NEXT_PUBLIC_API_URL=https://api.schoolmitra.com/api/v1
```

---

## 2. Docker Production Deployment

### Launching the Stack with Docker Compose

```bash
# 1. Clone repository & enter workspace
git clone https://github.com/erRahulSingh/SchoolMitra.git
cd SchoolMitra

# 2. Build and launch all 7 containers in detached mode
docker compose up --build -d

# 3. Verify container status and healthchecks
docker compose ps
```

---

## 3. SSL Certificate Setup (Let's Encrypt / Certbot)

```bash
# Issue SSL Certificate for Domain & Subdomains
docker run -it --rm --name certbot \
  -v "$(pwd)/docker/certbot/conf:/etc/letsencrypt" \
  -v "$(pwd)/docker/certbot/www:/var/www/certbot" \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  -d schoolmitra.com -d *.schoolmitra.com \
  --email admin@schoolmitra.com --agree-tos --no-eff-email
```

---

## 4. Disaster Recovery & Database Backups

### Automated Daily MongoDB Backup Script

```bash
#!/bin/bash
# Backup Script: /scripts/mongo-backup.sh
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/schoolmitra/$TIMESTAMP"

mkdir -p "$BACKUP_DIR"
mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR"
gzip -r "$BACKUP_DIR"

echo "Backup complete: $BACKUP_DIR"
```

---

## 5. Rollback Runbook

If a deployment failure occurs:

```bash
# 1. Rollback Git commit to previous stable release tag
git checkout tags/v1.0.0

# 2. Re-build and restart containers
docker compose up --build -d --force-recreate
```
