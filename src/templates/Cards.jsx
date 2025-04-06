import React from "react";
import { Link } from "react-router-dom";
import Noimg from "../../public/Noimg.jpg";

function Cards({ data, title }) {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto bg-[#1F1E24] p-[5%] ">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/Details/${c.id}`}
          className=" bg-white  shadow-lg rounded-lg hover:scale-105 transition duration-300"
          key={i}
        >
          <img
            src={
              c.backdrop_path || c.poster_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.backdrop_path || c.poster_path || c.profile_path
                  }`
                : Noimg
            }
            alt="img"
            className="w-full rounded-md h-48 object-cover shadow-[8px_17px_38px_2px]"
          />
          <div className="px-3 text-center font-semibold text-gray-800">
            {c.name || c.original_name || c.original_title || c.title}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Cards;
