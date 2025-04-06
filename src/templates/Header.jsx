import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] bg-center flex justify-end flex-col items-start p-[3.4%]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5), rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.poster_path || data.profile_path
        })`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
        {data.name || data.original_name || data.original_title || data.title}
      </h1>

      <p className="text-white mt-1 md:mt-2 mb-2 w-full sm:w-[80%] md:w-[60%] text-sm sm:text-base">
        {(data.overview || "No overview available.").slice(0, 100)}
        {data.overview?.length > 100 ? " ..." : ""}
      </p>
      <p className="text-white text-sm sm:text-base">
        <i className="ri-megaphone-fill text-[#6556CD]"></i>{" "}
        {data.release_date || data.first_air_date || "N/A"}
        <i className="ri-movie-fill text-[#6556CD] ml-3 sm:ml-5"></i>{" "}
        {data.media_type?.toUpperCase() || "UNKNOWN"}
      </p>
      <Link
        to={`/${data.media_type}/Details/${data.id}`}
        className="p-1.5 sm:p-2 mt-2 text-white text-sm sm:text-base font-semibold rounded bg-[#6556CD] hover:bg-opacity-80 transition duration-300"
      >
        More Info
      </Link>
    </div>
  );
}

export default Header;
