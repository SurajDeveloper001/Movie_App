import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { asyncloadmove } from "../actions/moveAction";
import TopNav from "../templates/TopNav";
import ReactPlayer from "react-player";

function MovieDetails() {
  document.title = "Movie Details";
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const playerRef = useRef(null);

  // Get movie details from Redux store
  const movie = useSelector((state) => state.movie.info);

  // Fetch movie details
  const getMovieDetails = async () => {
    try {
      setLoading(true);
      await dispatch(asyncloadmove(id));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false);
    }
  };

  // Fetch similar movies
  const getSimilarMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${id}/similar`);
      setSimilarMovies(data.results.slice(0, 8)); // Limit to 8 similar movies
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  // Fetch movie trailer
  const getMovieTrailer = async () => {
    try {
      const { data } = await axios.get(`/movie/${id}/videos`);
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailer(trailer);
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getSimilarMovies();
    getMovieTrailer();

    // Cleanup function
    return () => {
      // You can dispatch removemove() here if needed
      setShowTrailer(false);
    };
  }, [id]);

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center bg-[#1F1E24] text-white text-2xl">
      <p>Loading movie details...</p>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-[#1F1E24] text-white">
      {/* Back button and navigation */}
      <div className="w-full px-[5%] py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h1 className="text-zinc-400 text-xl sm:text-2xl font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer mr-2"
          ></i>
          Movie Details
        </h1>
        <div className="w-full sm:w-[50%]">
          <TopNav />
        </div>
      </div>

      {/* Movie backdrop */}
      <div
        className="w-full h-[30vh] sm:h-[50vh] bg-center bg-cover flex justify-end flex-col items-start p-[5%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      ></div>

      {/* Movie details */}
      <div className="flex flex-col md:flex-row p-[5%] gap-8 bg-[#1F1E24]">
        {/* Movie poster */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Movie info */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">{movie.title}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres &&
              movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-[#6556CD] rounded-full text-xs sm:text-sm"
                >
                  {genre.name}
                </span>
              ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-4 text-zinc-300 text-sm sm:text-base">
            <p>
              <i className="ri-calendar-line mr-2 text-[#6556CD]"></i>
              {movie.release_date}
            </p>
            <p>
              <i className="ri-time-line mr-2 text-[#6556CD]"></i>
              {movie.runtime} min
            </p>
            <p>
              <i className="ri-star-fill mr-2 text-yellow-500"></i>
              {movie.vote_average?.toFixed(1)} / 10
            </p>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold mb-2">Overview</h3>
          <p className="text-zinc-300 mb-6 text-sm sm:text-base">
            {movie.overview}
          </p>

          {trailer && (
            <button
              onClick={() => setShowTrailer(!showTrailer)}
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[#6556CD] rounded-lg font-semibold hover:bg-opacity-80 transition duration-300 text-sm sm:text-base"
            >
              <i className="ri-play-fill mr-2"></i>
              {showTrailer ? "Hide Trailer" : "Watch Trailer"}
            </button>
          )}

          {/* Trailer Video Player */}
          {trailer && showTrailer && (
            <div className="mt-6 w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${trailer.key}`}
                width="100%"
                height="100%"
                controls={true}
                playing={showTrailer}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Similar movies */}
      {similarMovies.length > 0 && (
        <div className="px-[5%] pb-10 bg-[#1F1E24]">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
            Similar Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {similarMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300"
                onClick={() => navigate(`/Movie/Details/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-36 sm:h-48 object-cover"
                />
                <div className="p-2 sm:p-3">
                  <h3 className="font-semibold truncate text-sm sm:text-base">
                    {movie.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    {movie.release_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
