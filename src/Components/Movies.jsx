import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import TopNav from "../templates/TopNav";
import Dropedown from "../templates/Dropedown";
import axios from "../utils/axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function Movies() {
  document.title = "Movies";

  const [category, setcategory] = useState("now_playing");
  const [Movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setMovies((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refraseHandeler = () => {
    if (Movies.length === 0) {
      GetMovies();
    } else {
      setpage(1);
      setMovies([]);
      GetMovies();
    }
  };

  useEffect(() => {
    refraseHandeler();
  }, [category]);

  return Movies.length > 0 ? (
    <div className="w-full h-screen ">
      <div className="w-full px-[5%]  flex items-center justify-between ">
        <h1 className="text-zinc-400  text-2xl font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>
          Movies(<small className="text-lg text-zinc-600 ">{category}</small>)
        </h1>
        <div className="w-[80%] flex items-center">
          <TopNav />
          <Dropedown
            title="Category"
            options={["upcoming", "top_rated", "popular", "now_playing"]}
            fun={(e) => setcategory(e.target.value)}
          />
          <div className="w-[3%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={Movies.length}
        next={GetMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={Movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Movies;
