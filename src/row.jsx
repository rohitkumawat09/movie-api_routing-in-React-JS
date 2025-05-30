import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Row({ urls, heading, btn1, btn2 }) {
  const [movieData, setMovieData] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(urls[0]);
  const [activeButton, setActiveButton] = useState(0);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(selectedUrl);
        const result = await response.json();
        setMovieData(result.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, [selectedUrl]);

  function trimContent(content) {
    if (content && content.length > 20) {
      return content.slice(0, 15) + "...";
    }
    return content;
  }

  const handleClick = (i) => {
    setActiveButton(i);
    setSelectedUrl(urls[i]);
  };

  return (
    <section>
      <header className="header">
        <h2>{heading}</h2>
        <div className="btn-group">
    <button
  className={activeButton === 0 ? "active-btn" : ""}
  onClick={() => handleClick(0)}
>
  {btn1}
</button>

<button
  className={activeButton === 1 ? "active-btn" : ""}
  onClick={() => handleClick(1)}
>
  {btn2}
</button>

        </div>
      </header>

      <div className="movieWrapper">
        {movieData.length > 0 ? (
          movieData.map((movie) => (
            <div
              key={movie.id}
              className="movieBox"
              onClick={() => handleMovieClick(movie)}
              style={{ cursor: "pointer" }}
            >
              {movie.poster_path && (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="nameimg"
                />
              )}
              <div className="content">
                <h3>{trimContent(movie.title || movie.name)}</h3>
                <p>
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </section>
  );
}

export default Row;
