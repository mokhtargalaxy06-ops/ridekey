# RideKey Deployment

This project has two deployable parts:

- Frontend: React/Vite static site for `https://ridekey.ma`
- Backend: Laravel API/admin storage for `https://api.ridekey.ma`

The frontend can be deployed to Netlify. The backend needs a PHP host that supports Laravel, persistent storage, and a database.

## Frontend: Netlify

1. Push this repository to GitHub.
2. Create a Netlify site from the repository.
3. Use these Netlify settings:
   - Base directory: project root
   - Build command: `npx vite build`
   - Publish directory: `dist`
4. Add this environment variable:
   - `VITE_API_BASE_URL=https://api.ridekey.ma/api`
5. Add the custom domain:
   - `ridekey.ma`
   - `www.ridekey.ma`
6. In DNS, point `ridekey.ma` and `www.ridekey.ma` to Netlify using the records Netlify provides.

## Backend: Laravel API

Deploy the `backend/` folder to a Laravel-capable host such as a VPS, Laravel Forge server, cPanel with PHP 8.3+, Ploi, RunCloud, or another PHP host.

The backend domain should be:

```text
https://api.ridekey.ma
```

The web root must point to:

```text
backend/public
```

Production `.env` values:

```env
APP_NAME="RideKey API"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.ridekey.ma
FRONTEND_URL=https://ridekey.ma

ADMIN_EMAIL=admin@ridekey.ma
ADMIN_PASSWORD=change-this-password
ADMIN_API_TOKEN=change-this-long-random-token

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ridekey
DB_USERNAME=ridekey
DB_PASSWORD=change-this-db-password

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

After uploading the backend:

```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan route:cache
```

Make these directories writable by the web server:

```text
backend/storage
backend/bootstrap/cache
backend/public/uploads
```

## DNS

Use:

```text
ridekey.ma       -> Netlify
www.ridekey.ma   -> Netlify
api.ridekey.ma   -> Laravel backend server
```

## Final Checks

Open:

```text
https://api.ridekey.ma/api/health
https://api.ridekey.ma/api/catalog
https://ridekey.ma
https://ridekey.ma/dashboard
```

The dashboard login must use the backend `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
