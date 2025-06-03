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
  const [director, setDirector] = useState(null);
  const [writer, setWriter] = useState(null);

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
        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`
        );
        const data = await response.json();
        setCast(data.cast || []);

        const directors = data.crew.filter((member) => member.job === "Director");
        setDirector(directors.length > 0 ? directors[0].name : null);

        const writers = data.crew.filter(
          (member) =>
            member.job === "Writer" ||
            member.job === "Screenplay" ||
            member.job === "Story"
        );
        setWriter(writers.length > 0 ? writers.map((w) => w.name).join(", ") : null);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    fetchMovieDetails();
    fetchTrailer();
    fetchCredits();
  }, [id]);
const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${d.getDate()},${monthNames[d.getMonth()]},${d.getFullYear()}`;
};


  const formatRuntime = (runtime) => {
    if (!runtime) return "";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

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

          <div className="movie-details">
            <p><strong>Status:</strong> {movieDetails.status || "N/A"}</p>
            <p><strong>Release Date:</strong> {formatDate(movieDetails.release_date)}</p>
            <p><strong>Runtime:</strong> {formatRuntime(movieDetails.runtime)}</p>
            {director && <p><strong>Director:</strong> {director}</p>}
            {writer && <p><strong>Writer:</strong> {writer}</p>}
          </div>

          <div className="span">
            {trailerKey ? (
              <span
                onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <FaYoutube />
              </span>
            ) : (
              <span>
                <FaYoutube />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="top_cast">
        <h2>Top Cast</h2>
        <div className="cast_list">
          <div className="member">
            {cast.map((actor) => (
              <div key={actor.id} className="cast_member">
                {actor.profile_path && (
                  <img
                    src={`${PROFILE_BASE_URL}${actor.profile_path}`}
                    alt={actor.name}
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
