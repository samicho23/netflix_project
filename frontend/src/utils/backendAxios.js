import axios from 'axios';

// Vite ከ .env ላይ እንዲያነብ import.meta.env እንጠቀማለን
const backendInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export default backendInstance;