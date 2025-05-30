import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";

const apikey = "3fb4c3ddfc88192745a5708f0de70cba";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w200";

function Singel() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);

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

    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`
        );
        const data = await response.json();
        setCast(data.cast || []);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
    fetchCast();
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
            
            />
          )}
        </div>

        <div className="text">
          <h1>{movieDetails.tagline}</h1>
          <h2>{movieDetails.original_title}</h2>
          <p>{movieDetails.overview}</p>
          <div className="span">
            {trailerKey ? (
              <span
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")
                }
                style={{ cursor: "pointer" }}
              >
                <FaYoutube  />
              </span>
            ) : (
              <span >
                <FaYoutube  />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="top_cast" >
        <h2>Top Cast</h2>
        <div
          className="cast_list"
      
        >

          <div className="member">
                {cast.map((actor) => (
            <div key={actor.id} className="cast_member" >
              {actor.profile_path && (
                <img
                  src={`${PROFILE_BASE_URL}${actor.profile_path}`}
                  alt=""
                  
             
                />
              )}
                <h5 className="actor">{actor.name}</h5>

            </div>
          ))}
          </div>
      
        </div>
      </div>
    </>
  );
}

export default Singel;
