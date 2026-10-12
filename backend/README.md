# Campusly backend

This Spring Boot REST API uses Java 21, Maven, Spring Security, JWT, JPA, and H2. Run from this directory with `mvn spring-boot:run`, or double-click `run.bat`. The API listens on `http://localhost:8081` by default. The frontend is separate in the sibling `../frontend` directory.

H2 persists data under `backend/data/campusly`; the database is created and the opportunity board is seeded on first startup. Student passwords are stored as BCrypt hashes. Signed JWTs expire after 12 hours.

## Local administrator

Set both variables in this Command Prompt before starting the server:

```cmd
set CAMPUSLY_ADMIN_EMAIL=admin@your-campus.edu
set CAMPUSLY_ADMIN_PASSWORD=choose-a-long-password
mvn spring-boot:run
```

The server creates or promotes that account to administrator on startup. Clear the variables after provisioning with `set CAMPUSLY_ADMIN_EMAIL=` and `set CAMPUSLY_ADMIN_PASSWORD=`. The default JWT signing secret is for local development; set a random `CAMPUSLY_JWT_SECRET` before any internet-facing deployment.

## API

- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/opportunities`, `GET /api/opportunities/{id}`
- `GET /api/profile`, `PUT /api/profile` (JWT required)
- `GET /api/applications`, `POST /api/applications` (JWT required)
- Administrator role required for opportunity changes and application status updates

CORS allows the development frontend origins `http://localhost:5500` and `http://127.0.0.1:5500`.
