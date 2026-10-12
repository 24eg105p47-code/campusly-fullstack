// Use the local Spring Boot server during development and Render in production.
const isLocalCampusly = ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const API_BASE = isLocalCampusly
  ? 'http://localhost:8081/api'
  : 'https://campusly-backend-shs3.onrender.com/api';

window.CAMPUSLY_API_BASE = API_BASE;
