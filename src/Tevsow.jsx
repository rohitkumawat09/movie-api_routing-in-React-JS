import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "3fb4c3ddfc88192745a5708f0de70cba";
const BASE_URL = "https://api.themoviedb.org/3/tv/popular";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const Tevsow = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigatee = useNavigate();

  const handleMovieClick = (movie) => {
    navigatee(`/movie/${movie.id}`);
  };

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      setMovies(prev => [...prev, ...data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading
      ) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="movies-container">
      <div className="movies-grid">
        {movies
        
        .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
        
        .map((movie) => (
          <div key={movie.id} className="movie">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE}${movie.poster_path}`}
                alt={movie.name}
                className="movie-poster"
                 onClick={() => handleMovieClick(movie)}
              />
            ) : (
              <div className="no-image">No Image Available</div>
            )}
          <div className="movie-info">
  <h3 className="movie-title">{movie.name}</h3>
  <p className="movie-date">
    {movie.first_air_date
      ? (() => {
          const d = new Date(movie.first_air_date);
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          return `${d.getDate()}, ${monthNames[d.getMonth()]}, ${d.getFullYear()}`;
        })()
      : ""}
  </p>
</div>


          </div>
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default Tevsow;
