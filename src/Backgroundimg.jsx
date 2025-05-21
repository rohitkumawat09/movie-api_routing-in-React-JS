import React, { useState, useEffect } from "react";

export default function HeroSection() {
  const [movieData, setMovieData] = useState([]);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const shows = {
    "upcoming movies": "https://api.themoviedb.org/3/movie/upcoming?api_key=3fb4c3ddfc88192745a5708f0de70cba&language=en-US&page=1",
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(shows["upcoming movies"]);
        const result = await response.json();
        setMovieData(result.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  const randomMovie =
    movieData.length > 0
      ? movieData[Math.floor(Math.random() * movieData.length)]
      : null;

  const backgroundImage = randomMovie?.poster_path
    ? `${IMAGE_BASE_URL}${randomMovie.poster_path}`
    : "https://via.placeholder.com/1920x1080?text=No+Image+Available";

  return (
    <div
      className="hero-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="content" >
            
            <div className='input'>
                <h1 className='Welcome'>Welcome.</h1>
            <p className='para'>Millions of movies, TV shows and people to discover. Explore now.</p>
            <div className='show'>    <input type="text" placeholder='Search for movie or tv show....' id='moviesearch'/>
                <button className='btn'>Search</button></div>
            
            </div>


        </div>
    </div>
  );
}
