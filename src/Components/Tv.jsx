import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import TopNav from "../templates/TopNav";
import Dropedown from "../templates/Dropedown";
import axios from "../utils/axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function Tv() {
  document.title = "Tv";

  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  const Gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refraseHandeler = () => {
    if (tv.length === 0) {
      Gettv();
    } else {
      setpage(1);
      settv([]);
      Gettv();
    }
  };

  useEffect(() => {
    refraseHandeler();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-full h-screen ">
      <div className="w-full px-[5%]  flex items-center justify-between ">
        <h1 className="text-zinc-400  text-2xl font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>
          tv(
          <small className="text-lg text-zinc-600 ">{category}</small>)
        </h1>
        <div className="w-[80%] flex items-center">
          <TopNav />
          <Dropedown
            title="Category"
            options={["top_rated", "popular", "on_the_air", "airing_today"]}
            fun={(e) => setcategory(e.target.value)}
          />
          <div className="w-[3%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={Gettv}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={tv} title="Tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Tv;
