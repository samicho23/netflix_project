import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Header from './components/Header/Header';
import Row from './components/Rows/Row';
import Banner from './components/Banner/Banner';
import requests from './utils/requests';

function BrowseHome() {
  // 🔒 የደህንነት ማረጋገጫ፡ ሎግኢን ካላደረገ ወደ መግቢያ ገጽ ይመልሰዋል
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowseHome />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;