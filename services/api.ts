import axios from 'axios';
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpc3MiOiJzYWthcHAtZXhwZW5zZXRyYWNrZXIiLCJleHAiOjE3NTgxODM2MDEsImlhdCI6MTc1NTU5MTYwMX0.A4hEpPaXq07-wwWskxhGk8aYjhGsepzPgKV0uvNYApk';

const api = axios.create({
  baseURL: 'https://sakuu.akmd.dev/api/v1',
  headers: {
    Authorization: AUTH_TOKEN,
    Accept: 'application/json',
  },
});

export default api;
