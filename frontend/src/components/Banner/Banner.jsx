import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import requests from '../../utils/requests';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(request.data.results[0]); // የመጀመሪያውን ፊልም ባነር እናደርጋለን
      return request;
    }
    fetchData();
  }, []);

  return (
    <header className="banner" style={{
      backgroundSize: "cover",
      backgroundImage: `url("${movie?.backdrop_path}")`,
      backgroundPosition: "center center",
    }}>
      <div className="banner_contents">
        <h1 className="banner_title">{movie?.title}</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{movie?.overview}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;