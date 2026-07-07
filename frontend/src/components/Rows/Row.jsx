import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import './Row.css';

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map(movie => (
          <div key={movie.id} className="row_poster_container">
            <img className="row_poster" src={movie.backdrop_path} alt={movie.title} />
            <p className="movie_name">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;