const express = require('express');
const cors = require('cors');

const app = express();

// የፖርት እና የኔትወርክ መፍቀጃ (CORS)
app.use(cors());
app.use(express.json());

// ለኔትፍሊክስ ክሎን የሚሆን የፊልሞች ዳታ (Mock Data)
const moviesData = {
  trending: [
    { id: 1, title: "Stranger Things", backdrop_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800", overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments." },
    { id: 2, title: "Wednesday", backdrop_path: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=800", overview: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree." }
  ],
  topRated: [
    { id: 3, title: "The Witcher", backdrop_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800", overview: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny." },
    { id: 4, title: "Extraction 2", backdrop_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800", overview: "Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission." }
  ],
  action: [
    { id: 5, title: "Die Hard", backdrop_path: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800", overview: "An NYPD officer tries to save his wife and several others taken hostage by German terrorists." }
  ]
};

// API Endpoints
app.get('/api/movies/trending', (req, res) => res.json({ results: moviesData.trending }));
app.get('/api/movies/top-rated', (req, res) => res.json({ results: moviesData.topRated }));
app.get('/api/movies/action', (req, res) => res.json({ results: moviesData.action }));

// ዋናው ሰርቨር መነሻ ገጽ
app.get('/', (req, res) => {
  res.send('Netflix Backend API is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Node.js Backend Server is running on port ${PORT}`);
});