import axios from 'axios';

// 🎬 ወደ TMDB ሰርቨር የሚወስደው ዋናው መነሻ መስመር
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;