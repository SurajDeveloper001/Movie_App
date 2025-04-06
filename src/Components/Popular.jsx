import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import TopNav from "../templates/TopNav";
import Dropedown from "../templates/Dropedown";
import axios from "../utils/axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  document.title = "Popular";

  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  const Getpopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refraseHandeler = () => {
    if (popular.length === 0) {
      Getpopular();
    } else {
      setpage(1);
      setpopular([]);
      Getpopular();
    }
  };

  useEffect(() => {
    refraseHandeler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-full h-screen ">
      <div className="w-full px-[5%]  flex items-center justify-between ">
        <h1 className="text-zinc-400  text-2xl font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>
          Popular(<small className="text-lg text-zinc-600 ">{category}</small>)
        </h1>
        <div className="w-[80%] flex items-center">
          <TopNav />
          <Dropedown
            title="Category"
            options={["tv", "movie"]}
            fun={(e) => setcategory(e.target.value)}
          />
          <div className="w-[3%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={Getpopular}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Popular;
