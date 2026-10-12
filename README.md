# Campusly Full Stack

This folder is a self-contained copy of the Campusly React frontend and Spring Boot backend. It does not include installed dependencies, build output, logs, or the local database file.

## Requirements

- Node.js and npm
- Java 21
- Maven

## Run locally on Windows

Open two Command Prompt windows.

In the first window, start the backend:

```bat
cd /d "C:\Users\chara\OneDrive\Documents\ChatGPT\offlinestudy\campusly-fullstack\backend"
mvn spring-boot:run
```

In the second window, start the frontend:

```bat
cd /d "C:\Users\chara\OneDrive\Documents\ChatGPT\offlinestudy\campusly-fullstack\frontend"
npm install
npm run dev
```

Open the address Vite displays (normally `http://localhost:5500/`). The frontend calls the backend at `http://localhost:8081/api` when running on localhost. The backend creates its H2 database in `backend/data/` the first time it starts.

## Run scripts

Double-click `start-backend.bat` and `start-frontend.bat` in separate Command Prompt windows, or use the commands above.

## Deploy to Render

The backend includes its Dockerfile and startup script. Set the backend's `CAMPUSLY_JWT_SECRET` and `CAMPUSLY_CORS_ALLOWED_ORIGINS` environment variables in Render. For permanent hosted data, configure Render Postgres environment variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`. The frontend uses the Campusly Render backend URL whenever it is not opened on localhost.
