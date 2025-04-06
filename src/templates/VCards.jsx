import React from "react";
import { Link } from "react-router-dom";
import Noimg from "../../public/Noimg.jpg";

function VCards({ data }) {
  return (
    <div className="w-full flex overflow-x-auto gap-3 sm:gap-6 p-3 sm:p-5 pb-6 scrollbar-thin scrollbar-thumb-[#6556CD] scrollbar-track-transparent">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type}/details/${d.id}`}
          key={i}
          className="min-w-[160px] sm:min-w-[200px] bg-zinc-800 rounded-lg overflow-hidden shadow-lg mb-5 hover:scale-105 transition duration-300"
        >
          <img
            src={
              d.backdrop_path || d.poster_path || d.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    d.backdrop_path || d.poster_path || d.profile_path
                  }`
                : Noimg
            }
            alt="photo"
            className="w-full h-32 sm:h-40 object-cover"
          />
          <div className="p-2 sm:p-3 text-white text-center">
            <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2 line-clamp-2">
              {d.overview || "No description available."}
              <span className="text-blue-400"> more...</span>
            </p>
            <h2 className="text-base sm:text-lg font-semibold truncate">
              {d.name || d.original_name || d.original_title || d.title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VCards;
