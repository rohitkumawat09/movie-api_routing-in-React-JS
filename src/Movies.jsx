import React, { useEffect, useState, useCallback } from "react";

const API_KEY = "3fb4c3ddfc88192745a5708f0de70cba";
const BASE_URL = "https://api.themoviedb.org/3/movie/popular";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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
  const navigate = useNavigate();

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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    if (isNaN(d)) return "N/A";

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };
const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movies-container">
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
                onClick={() => handleMovieClick(movie)}
              />
            ) : (
              <div className="no-image">No Image Available</div>
            )}
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-date">{formatDate(movie.release_date)}</p>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default Movies;
