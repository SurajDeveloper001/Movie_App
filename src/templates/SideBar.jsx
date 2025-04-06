import React from "react";
import { Link } from "react-router-dom";

function SideBar({ closeSidebar }) {
  return (
    <div className="w-full h-full bg-[#1F1E24] border-r-2 border-zinc-700 p-5 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">
          <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
          <span className="text-2xl">Moves</span>
        </h1>
        <button
          onClick={closeSidebar}
          className="md:hidden text-zinc-400 hover:text-white"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>
      </div>

      <nav className="flex flex-col text-zinc-400 gap-2 text-base md:text-xl">
        <h1 className="text-white font-semibold text-lg md:text-xl mt-8 mb-3 md:mt-10 md:mb-5">
          New Feeds
        </h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300"
          onClick={closeSidebar}
        >
          <i className="mr-2 ri-fire-fill"></i>
          Trending
        </Link>
        <Link
          to="/Popular"
          className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300"
          onClick={closeSidebar}
        >
          <i className="mr-2 ri-bard-fill"></i>
          Popular
        </Link>

        <Link
          to="/Movie"
          className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300"
          onClick={closeSidebar}
        >
          <i className="mr-2 ri-movie-2-line"></i>
          Movies
        </Link>

        <Link
          to="/Tv"
          className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300"
          onClick={closeSidebar}
        >
          <i className="mr-2 ri-slideshow-3-line"></i>
          TV Shows
        </Link>
        <Link
          to="/People"
          className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300"
          onClick={closeSidebar}
        >
          <i className="mr-2 ri-user-search-fill"></i>
          People
        </Link>
      </nav>
      <hr className="mt-5 border-none h-[1px] bg-zinc-700" />

      <nav className="flex flex-col text-zinc-400 gap-2 text-base md:text-xl">
        <h1 className="text-white font-semibold text-lg md:text-xl mt-4 mb-2 md:mt-6">
          Website Information
        </h1>

        <Link
          className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300"
          onClick={closeSidebar}
        >
          <i className="mr-2 ri-information-2-fill"></i>
          About
        </Link>
        <Link
          className="hover:bg-[#6556CD] hover:text-white p-2 rounded-lg duration-300"
          onClick={closeSidebar}
        >
          <i className="mr-2 ri-phone-fill"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
}

export default SideBar;
