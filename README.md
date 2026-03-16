# cripto

Aplicacion web con frontend en React + Vite y backend en Flask.

## Requisitos

- Docker y Docker Compose
- Node.js 18+ si vas a correr el frontend localmente
- Python 3.10+ si vas a correr el backend localmente

## Levantar la app con Docker

Desde la raiz del proyecto:

```bash
docker compose up --build
```

Servicios:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Swagger UI: `http://localhost:5000/swagger-ui`
- PostgreSQL: `localhost:5432`

Notas:

- El backend ejecuta automaticamente las migraciones con `flask db upgrade`.
- El backend ejecuta automaticamente el seeder de administrador con `flask seed-admin`.

## Levantar la app en local

### Backend

Instalar dependencias:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Variables de entorno:

- Si no defines `DATABASE_URL`, Flask usa `sqlite:///app.db`.
- Si quieres usar PostgreSQL local, exporta `DATABASE_URL` antes de correr la app.

Ejecutar migraciones:

```bash
cd backend
export FLASK_APP=app.py
flask db upgrade
```

Ejecutar seeder de usuario admin:

```bash
cd backend
export FLASK_APP=app.py
flask seed-admin
```

Levantar backend:

```bash
cd backend
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Comando del seeder

El seeder `backend/seeders/user_seeder.py` no se corre directamente. El comando correcto es:

```bash
cd backend
export FLASK_APP=app.py
flask seed-admin
```

## Credenciales del admin seed

- Email: `admin@hablemoscripto.com`
- Password: `H4bl3mosCPRT26`
