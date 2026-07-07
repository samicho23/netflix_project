import React from 'react';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import Row from './components/Rows/Row';
import requests from './utils/requests';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <Row title="NETFLIX ORIGINALS (Trending)" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
    </div>
  );
}

export default App;