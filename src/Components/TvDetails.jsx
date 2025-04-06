import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { loadtv } from "../reducers/tvSlice";
import TopNav from "../templates/TopNav";
import ReactPlayer from "react-player";

function TvDetails() {
  document.title = "TV Show Details";
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [similarShows, setSimilarShows] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const playerRef = useRef(null);

  // Get TV show details from Redux store
  const tvShow = useSelector((state) => state.tv.info);

  // Fetch TV show details
  const getTvDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tv/${id}`);
      dispatch(loadtv(data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
      setLoading(false);
    }
  };

  // Fetch similar TV shows
  const getSimilarShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${id}/similar`);
      setSimilarShows(data.results.slice(0, 8)); // Limit to 8 similar shows
    } catch (error) {
      console.error("Error fetching similar TV shows:", error);
    }
  };

  // Fetch TV show trailer
  const getTvTrailer = async () => {
    try {
      const { data } = await axios.get(`/tv/${id}/videos`);
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setTrailer(trailer);
    } catch (error) {
      console.error("Error fetching TV show trailer:", error);
    }
  };

  useEffect(() => {
    getTvDetails();
    getSimilarShows();
    getTvTrailer();

    // Cleanup function
    return () => {
      // You can dispatch removetv() here if needed
      setShowTrailer(false);
    };
  }, [id]);

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center bg-[#1F1E24] text-white text-2xl">
      <p>Loading TV show details...</p>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-[#1F1E24] text-white">
      {/* Back button and navigation */}
      <div className="w-full px-[5%] py-4 flex items-center justify-between">
        <h1 className="text-zinc-400 text-2xl font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer"
          ></i>
          TV Show Details
        </h1>
        <div className="w-[50%]">
          <TopNav />
        </div>
      </div>

      {/* TV show backdrop */}
      <div
        className="w-full h-[50vh] bg-center bg-cover flex justify-end flex-col items-start p-[5%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${tvShow.backdrop_path})`,
        }}
      ></div>

      {/* TV show details */}
      <div className="flex flex-col md:flex-row p-[5%] gap-8 bg-[#1F1E24]">
        {/* TV show poster */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`}
            alt={tvShow.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* TV show info */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-4xl font-bold mb-2">{tvShow.name}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {tvShow.genres &&
              tvShow.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-[#6556CD] rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
          </div>

          <div className="flex items-center gap-6 mb-4 text-zinc-300">
            <p>
              <i className="ri-calendar-line mr-2 text-[#6556CD]"></i>
              {tvShow.first_air_date}
            </p>
            <p>
              <i className="ri-time-line mr-2 text-[#6556CD]"></i>
              {tvShow.episode_run_time && tvShow.episode_run_time[0]}{" "}
              min/episode
            </p>
            <p>
              <i className="ri-star-fill mr-2 text-yellow-500"></i>
              {tvShow.vote_average?.toFixed(1)} / 10
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-2">Overview</h3>
          <p className="text-zinc-300 mb-6">{tvShow.overview}</p>

          {trailer && (
            <button
              onClick={() => setShowTrailer(!showTrailer)}
              className="inline-block px-6 py-3 bg-[#6556CD] rounded-lg font-semibold hover:bg-opacity-80 transition duration-300"
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

      {/* Similar TV shows */}
      {similarShows.length > 0 && (
        <div className="px-[5%] pb-10 bg-[#1F1E24]">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Similar TV Shows
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarShows.map((show) => (
              <div
                key={show.id}
                className="bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300"
                onClick={() => navigate(`/Tv/Details/${show.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold truncate">{show.name}</h3>
                  <p className="text-zinc-400 text-sm">{show.first_air_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TvDetails;
