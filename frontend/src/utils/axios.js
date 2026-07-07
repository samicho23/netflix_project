import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // የዶከር backend ሰርቨር አድራሻ
});

export default instance;