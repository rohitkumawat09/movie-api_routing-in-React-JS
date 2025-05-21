import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apikey="3fb4c3ddfc88192745a5708f0de70cba"

function Singel() {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
 const [movieDetails, setMovieDetails] = useState([]);

  const { id } = useParams();

  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);
console.log(movieDetails);

  return(
  <>
<div className="img">

  <div className="good">  <img
          src={`${IMAGE_BASE_URL}${movieDetails.poster_path}`}
          alt=""
          className="movie-poster"
          style={{ width: "300px", height: "auto" }}
        /></div>

        <div className="text">
          <h1>{movieDetails.tagline}</h1>
        <h2>{movieDetails.
original_title
}</h2>
<p>{movieDetails.overview}</p>

        </div>
  
</div>

</>
  )

}
export default Singel



