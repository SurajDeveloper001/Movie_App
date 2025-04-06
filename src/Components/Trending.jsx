import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import TopNav from "../templates/TopNav";
import Dropedown from "../templates/Dropedown";
import axios from "../utils/axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
function Trending() {
  document.title = "Trending";

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  const GetTrinding = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refraseHandeler = () => {
    if (trending.length === 0) {
      GetTrinding();
    } else {
      setpage(1);
      settrending([]);
      GetTrinding();
    }
  };

  useEffect(() => {
    refraseHandeler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full h-screen ">
      <div className="w-full px-[5%]  flex items-center justify-between ">
        <h1 className="text-zinc-400  text-2xl font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>
          Trending(<small className="text-lg text-zinc-600 ">{category}</small>)
        </h1>
        <div className="w-[80%] flex items-center">
          <TopNav />
          <Dropedown
            title="Category"
            options={["movie", "tv", "all"]}
            fun={(e) => setcategory(e.target.value)}
          />
          <div className="w-[3%]"></div>
          <Dropedown
            title="Duration"
            options={["day", "week"]}
            fun={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrinding}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Trending;
