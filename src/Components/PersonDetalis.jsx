import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { loadperson } from "../reducers/personSlice";
import TopNav from "../templates/TopNav";

function PersonDetalis() {
  document.title = "Person Details";
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [knownFor, setKnownFor] = useState([]);
  const [activeTab, setActiveTab] = useState("movies");
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);

  // Get person details from Redux store
  const person = useSelector((state) => state.person.info);

  // Fetch person details
  const getPersonDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/person/${id}`);
      dispatch(loadperson(data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching person details:", error);
      setLoading(false);
    }
  };

  // Fetch person's known for movies/shows
  const getKnownFor = async () => {
    try {
      const { data } = await axios.get(`/person/${id}/combined_credits`);

      // Sort by popularity and take top 8
      const sortedCredits = [...data.cast]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 8);

      setKnownFor(sortedCredits);

      // Separate movie and TV credits
      const movies = data.cast
        .filter((credit) => credit.media_type === "movie")
        .sort(
          (a, b) =>
            new Date(b.release_date || "1900") -
            new Date(a.release_date || "1900")
        );

      const tvShows = data.cast
        .filter((credit) => credit.media_type === "tv")
        .sort(
          (a, b) =>
            new Date(b.first_air_date || "1900") -
            new Date(a.first_air_date || "1900")
        );

      setMovieCredits(movies);
      setTvCredits(tvShows);
    } catch (error) {
      console.error("Error fetching person credits:", error);
    }
  };

  // Calculate age
  const calculateAge = (birthdate, deathdate = null) => {
    if (!birthdate) return null;

    const birth = new Date(birthdate);
    const end = deathdate ? new Date(deathdate) : new Date();
    const ageDiff = end.getFullYear() - birth.getFullYear();

    const monthDiff = end.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
      return ageDiff - 1;
    }

    return ageDiff;
  };

  useEffect(() => {
    getPersonDetails();
    getKnownFor();

    // Cleanup function
    return () => {
      // You can dispatch removeperson() here if needed
    };
  }, [id]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center bg-[#1F1E24] text-white text-2xl">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#6556CD] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>Loading person details...</p>
      </div>
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
          Person Details
        </h1>
        <div className="w-full sm:w-[50%]">
          <TopNav />
        </div>
      </div>

      {/* Person details */}
      <div className="flex flex-col md:flex-row p-[5%] gap-8 bg-[#1F1E24]">
        {/* Person profile image */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="sticky top-5">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/original/${person.profile_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={person.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />

            {/* Personal Info Section */}
            <div className="mt-6 bg-zinc-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 border-b border-zinc-700 pb-2">
                Personal Info
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-zinc-400 text-sm">Known For</h4>
                  <p className="text-white">
                    {person.known_for_department || "Acting"}
                  </p>
                </div>

                <div>
                  <h4 className="text-zinc-400 text-sm">Gender</h4>
                  <p className="text-white">
                    {person.gender === 1
                      ? "Female"
                      : person.gender === 2
                      ? "Male"
                      : "Not specified"}
                  </p>
                </div>

                <div>
                  <h4 className="text-zinc-400 text-sm">Birthday</h4>
                  <p className="text-white">
                    {formatDate(person.birthday)}
                    {person.birthday && !person.deathday && (
                      <span className="text-zinc-400 ml-1">
                        (Age: {calculateAge(person.birthday)})
                      </span>
                    )}
                  </p>
                </div>

                {person.deathday && (
                  <div>
                    <h4 className="text-zinc-400 text-sm">Died</h4>
                    <p className="text-white">
                      {formatDate(person.deathday)}
                      <span className="text-zinc-400 ml-1">
                        (Age: {calculateAge(person.birthday, person.deathday)})
                      </span>
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-zinc-400 text-sm">Place of Birth</h4>
                  <p className="text-white">
                    {person.place_of_birth || "Unknown"}
                  </p>
                </div>

                {person.also_known_as && person.also_known_as.length > 0 && (
                  <div>
                    <h4 className="text-zinc-400 text-sm">Also Known As</h4>
                    <div className="text-white">
                      {person.also_known_as.map((name, index) => (
                        <p key={index} className="text-sm">
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Person info */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{person.name}</h1>

          {/* Biography */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-3">Biography</h3>
            {person.biography ? (
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {person.biography}
              </p>
            ) : (
              <p className="text-zinc-400 italic">No biography available.</p>
            )}
          </div>

          {/* Known For Section */}
          {knownFor.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Known For</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {knownFor.map((credit) => (
                  <div
                    key={`${credit.id}-${credit.media_type}`}
                    className="bg-zinc-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-md"
                    onClick={() =>
                      navigate(
                        `/${
                          credit.media_type === "movie" ? "Movie" : "Tv"
                        }/Details/${credit.id}`
                      )
                    }
                  >
                    <img
                      src={
                        credit.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${credit.poster_path}`
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={credit.title || credit.name}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="p-2 sm:p-3">
                      <h3 className="font-semibold truncate text-sm">
                        {credit.title || credit.name}
                      </h3>
                      <p className="text-zinc-400 text-xs">
                        {credit.media_type === "movie" ? "Movie" : "TV Show"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Credits Tabs */}
          <div className="mt-10">
            <div className="flex border-b border-zinc-700 mb-6">
              <button
                className={`px-4 py-2 text-sm sm:text-base font-medium ${
                  activeTab === "movies"
                    ? "text-white border-b-2 border-[#6556CD]"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("movies")}
              >
                Movies ({movieCredits.length})
              </button>
              <button
                className={`px-4 py-2 text-sm sm:text-base font-medium ${
                  activeTab === "tv"
                    ? "text-white border-b-2 border-[#6556CD]"
                    : "text-zinc-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("tv")}
              >
                TV Shows ({tvCredits.length})
              </button>
            </div>

            {/* Movie Credits */}
            {activeTab === "movies" && (
              <div className="space-y-3">
                {movieCredits.length > 0 ? (
                  movieCredits.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer"
                      onClick={() => navigate(`/Movie/Details/${movie.id}`)}
                    >
                      <div className="flex-shrink-0 w-full sm:w-auto mb-2 sm:mb-0">
                        <img
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w92/${movie.poster_path}`
                              : "https://via.placeholder.com/92x138?text=No+Image"
                          }
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded-md"
                        />
                      </div>
                      <div className="sm:ml-4 flex-grow">
                        <h4 className="font-semibold">{movie.title}</h4>
                        <p className="text-zinc-400 text-sm">
                          {movie.character
                            ? `as ${movie.character}`
                            : "Role not specified"}
                        </p>
                      </div>
                      <div className="text-zinc-400 text-sm mt-2 sm:mt-0">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "N/A"}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400 italic">
                    No movie credits found.
                  </p>
                )}
              </div>
            )}

            {/* TV Credits */}
            {activeTab === "tv" && (
              <div className="space-y-3">
                {tvCredits.length > 0 ? (
                  tvCredits.map((show) => (
                    <div
                      key={show.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer"
                      onClick={() => navigate(`/Tv/Details/${show.id}`)}
                    >
                      <div className="flex-shrink-0 w-full sm:w-auto mb-2 sm:mb-0">
                        <img
                          src={
                            show.poster_path
                              ? `https://image.tmdb.org/t/p/w92/${show.poster_path}`
                              : "https://via.placeholder.com/92x138?text=No+Image"
                          }
                          alt={show.name}
                          className="w-16 h-24 object-cover rounded-md"
                        />
                      </div>
                      <div className="sm:ml-4 flex-grow">
                        <h4 className="font-semibold">{show.name}</h4>
                        <p className="text-zinc-400 text-sm">
                          {show.character
                            ? `as ${show.character}`
                            : "Role not specified"}
                        </p>
                        <p className="text-zinc-500 text-xs">
                          {show.episode_count
                            ? `${show.episode_count} episodes`
                            : ""}
                        </p>
                      </div>
                      <div className="text-zinc-400 text-sm mt-2 sm:mt-0">
                        {show.first_air_date
                          ? new Date(show.first_air_date).getFullYear()
                          : "N/A"}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400 italic">
                    No TV show credits found.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetalis;
