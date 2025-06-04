import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import "./Header.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";
const SEARCH_API_BASE =
  "https://api.themoviedb.org/3/search/movie?api_key=3fb4c3ddfc88192745a5708f0de70cba&query=";

function Header() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); 
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const toggleSearch = () => {
    setShowSearchInput((prev) => !prev);
    setSearchTerm("");
    setSearchResults([]);
    setHighlightIndex(-1);
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(SEARCH_API_BASE + encodeURIComponent(searchTerm))
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.results || []);
          setHighlightIndex(-1);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setSearchResults([]);
        });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((idx) => (idx + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((idx) =>
        idx <= 0 ? searchResults.length - 1 : idx - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < searchResults.length) {
        handleMovieClick(searchResults[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      toggleSearch();
    }
  };

  const handleMovieClick = (movie) => {
    setShowSearchInput(false);
    setSearchTerm("");
    setSearchResults([]);
    setHighlightIndex(-1);
    navigate(`/movie/${movie.id}`);
  };

  const Logo = () => (
    <Link to="/" className="logo-link">
      <img
        src="https://moviex-olive.vercel.app/assets/movix-logo-d720c325.svg"
        alt="Logo"
        className="logo-img"
      />
    </Link>
  );

  return (
    <div className="header-bg">
      <div className="container">
        <Logo />

        <ul className="tvsearch">
          {!showSearchInput ? (
            <>
              <li className="nav-item">
                <Link to="/Allmovies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link to="/TvShows">TV Shows</Link>
              </li>
              <li>
                <button
                  onClick={toggleSearch}
                  aria-label="Open search"
                  className="btn-search-open"
                  aria-expanded={showSearchInput}
                >
                  <IoSearchOutline />
                </button>
              </li>
            </>
          ) : (
            <li className="search-form-wrapper">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (highlightIndex >= 0) {
                    handleMovieClick(searchResults[highlightIndex]);
                  }
                }}
                className="search-form"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search movies..."
                  autoFocus
                  onKeyDown={handleKeyDown}
                  className="search-input"
                  aria-autocomplete="list"
                  aria-controls="search-results-list"
                  aria-activedescendant={
                    highlightIndex >= 0 ? `result-${highlightIndex}` : undefined
                  }
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="btn-search-submit"
                >
                  <IoSearchOutline />
                </button>
                <button
                  type="button"
                  onClick={toggleSearch}
                  aria-label="Close search"
                  className="btn-search-close"
                >
                  ✖️
                </button>
              </form>

              {searchResults.length > 0 && (
                <div
                  id="search-results-list"
                  role="listbox"
                  className="search-results-dropdown"
                >
                  {searchResults.map((movie, idx) => (
                    <div
                      id={`result-${idx}`}
                      key={movie.id}
                      role="option"
                      aria-selected={highlightIndex === idx}
                      onClick={() => handleMovieClick(movie)}
                      onMouseEnter={() => setHighlightIndex(idx)}
                      className={`search-result-item ${
                        highlightIndex === idx ? "highlighted" : ""
                      }`}
                    >
                      {movie.poster_path ? (
                        <img
                          src={IMAGE_BASE_URL + movie.poster_path}
                          alt={movie.title}
                          className="search-result-img"
                        />
                      ) : (
                        <div className="search-result-noimg">No Image</div>
                      )}
                      <div className="search-result-text">
                        <div className="search-result-title">
                          {movie.title || movie.name}
                        </div>
                        <div className="search-result-year">
                          {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
