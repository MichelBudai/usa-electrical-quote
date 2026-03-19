# Déploiement VPS via GitHub Actions

Chaque **push sur `main`** déclenche le workflow **Deploy static sites** : build Next.js (export statique) puis upload `out/` sur le VPS et reload Nginx.

- **pest-control** → `/var/www/pest-control-static`
- **plumbing** → `/var/www/plumbing-static`

Les deux sites sont déployés en parallèle (matrix).

## 1) Pré-requis VPS

- Nginx installé et actif
- Vhosts qui servent `/var/www/pest-control-static` et `/var/www/plumbing-static`

Créer les vhosts HTTP (sur le VPS) :

```bash
sudo ./scripts/vps-setup-static-site.sh pest-control usa-pest-control-quote.com www.usa-pest-control-quote.com
sudo ./scripts/vps-setup-static-site.sh plumbing usa-plumber-quote.com www.usa-plumber-quote.com
```

## 2) Clé SSH deploy (sans passphrase)

Sur ton PC (Git Bash) :

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy_nopass -N ""
cat ~/.ssh/github_actions_deploy_nopass.pub
```

Ajoute la **clé publique** dans `~/.ssh/authorized_keys` sur le VPS (root).

## 3) Secrets GitHub

Repo → **Settings → Secrets and variables → Actions → Secrets** :

| Secret | Valeur |
|--------|--------|
| `VPS_HOST` | IP du VPS (ex. 187.124.147.244) |
| `VPS_USER` | `root` (ou user dédié) |
| `VPS_SSH_PRIVATE_KEY` | Contenu de `~/.ssh/github_actions_deploy_nopass` (clé privée entière, BEGIN/END) |

⚠️ La clé doit être **sans passphrase**. Si tu colles une clé avec passphrase, le workflow échouera (Load key: error in libcrypto). Coller sans espaces ni retours en trop (le workflow enlève les `\r` automatiquement).

## 4) Déployer

- **Automatique** : push sur `main` → les deux sites (pest-control + plumbing) sont buildés et déployés.
- **Manuel** : GitHub → Actions → **Deploy static sites** → Run workflow.

## 5) Ajouter une nouvelle niche (ex. roofing)

Éditer `.github/workflows/deploy-static.yml` : dans `strategy.matrix.include`, ajouter :

```yaml
- SITE_SLUG: roofing
  REMOTE_DIR: /var/www/roofing-static
```

Puis créer le vhost sur le VPS et push.
