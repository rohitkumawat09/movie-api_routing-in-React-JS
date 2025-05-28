import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";

const apikey = "3fb4c3ddfc88192745a5708f0de70cba";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Singel() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`
        );
        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
  }, [id]);

  return (
    <>
      <div className="img">
        <div className="good">
          {movieDetails.poster_path && (
            <img
              src={`${IMAGE_BASE_URL}${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="movie-poster"
              style={{ width: "300px", height: "auto", borderRadius: "10px" }}
            />
          )}
        </div>

        <div className="text">
          <h1>{movieDetails.tagline}</h1>
          <h2>{movieDetails.original_title}</h2>
          <p>{movieDetails.overview}</p>
          <div className="span" >
            {trailerKey ? (
              <span
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")
                }
                style={{ cursor: "pointer" }}
              >
                <FaYoutube />
              </span>
            ) : (
              <span style={{ opacity: 0.5 }}>
                <FaYoutube />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Singel;
