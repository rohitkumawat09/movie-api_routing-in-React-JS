
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [movieData, setMovieData] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const UPCOMING_MOVIES_API =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=3fb4c3ddfc88192745a5708f0de70cba&language=en-US&page=1";

  const SEARCH_API_BASE =
    "https://api.themoviedb.org/3/search/movie?api_key=3fb4c3ddfc88192745a5708f0de70cba&query=";

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const response = await fetch(UPCOMING_MOVIES_API);
        const result = await response.json();
        const movies = result.results || [];
        setMovieData(movies);

        if (movies.length > 0) {
          setRandomMovie(movies[Math.floor(Math.random() * movies.length)]);
        }
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    }

    fetchUpcomingMovies();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a valid search query!");
      return;
    }

    try {
      const response = await fetch(
        `${SEARCH_API_BASE}${encodeURIComponent(searchQuery)}`
      );
      const result = await response.json();
      setSearchResults(result.results || []);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  function trimContentText(content) {
    return content && content.length > 20 ? content.slice(0, 15) + "..." : content;
  }

   const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${d.getDate()} ${monthNames[d.getMonth()]}, ${d.getFullYear()}`;
  };
  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const backgroundImage = randomMovie?.poster_path
    ? `${IMAGE_BASE_URL}${randomMovie.poster_path}`
    : "https://via.placeholder.com/1920x1080?text=No+Image+Available";

  return (
    <>
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="content">
          <h1 className="Welcome">Welcome.</h1>
          <p className="para">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>

          <div className="show">
            <input
              type="text"
              placeholder="Search for movie or tv show..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h1 className="Search">Search results</h1>
          <div className="results-container">
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                style={{ cursor: "pointer" }}
                onClick={() => handleMovieClick(movie)}
              >
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}

                  />
                  
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <p className="movie-title">{trimContentText(movie.title || movie.name)}</p>
                  <p className="movie-date">{formatDate(movie.release_date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

