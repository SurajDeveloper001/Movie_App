import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Noimg from "../../public/Noimg.jpg";

function TopNav() {
  const [query, setquery] = useState("");
  const [setsearches, setsetsearches] = useState([]);

  const GetSerch = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      setsetsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      GetSerch();
    } else {
      setsetsearches([]);
    }
  }, [query]);

  return (
    <div className="w-full sm:w-[80%] h-[10vh] mx-auto relative flex items-center">
      <i className="mr-2 text-xl sm:text-3xl text-zinc-400 ri-search-2-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search..."
        className="w-full sm:w-[50%] mx-2 sm:mx-10 p-2 sm:p-5 outline-none text-base sm:text-xl bg-transparent text-zinc-200"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-zinc-400 ri-close-line cursor-pointer"
        ></i>
      )}

      {query.length > 0 && setsearches.length > 0 && (
        <div className="absolute w-full sm:w-[80%] max-h-[50vh] bg-zinc-300 top-[100%] left-0 sm:left-[5%] overflow-auto rounded z-50">
          {setsearches.map((s, i) => (
            <Link
              key={i}
              to={`/${
                s.media_type === "movie"
                  ? "Movie"
                  : s.media_type === "tv"
                  ? "Tv"
                  : "Person"
              }/Details/${s.id}`}
              className="hover:text-black hover:bg-zinc-400 duration-300 font-semibold text-zinc-600 w-full p-3 sm:p-10 flex justify-start items-center border-b-2 border-zinc-100"
              onClick={() => setquery("")}
            >
              <img
                className="w-[8vh] h-[8vh] sm:w-[10vh] sm:h-[10vh] object-cover rounded shadow-lg mr-2 sm:mr-5"
                src={
                  s.backdrop_path || s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.poster_path || s.profile_path
                      }`
                    : Noimg
                }
                alt="img"
              />
              <span className="truncate">
                {s.name || s.original_name || s.original_title || s.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopNav;
