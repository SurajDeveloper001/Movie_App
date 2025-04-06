import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import TopNav from "../templates/TopNav";
import Dropedown from "../templates/Dropedown";
import axios from "../utils/axios";
import Cards from "../templates/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

function People() {
  document.title = "People";

  const [category, setcategory] = useState("popular");
  const [People, setPeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refraseHandeler = () => {
    if (People.length === 0) {
      GetPeople();
    } else {
      setpage(1);
      setPeople([]);
      GetPeople();
    }
  };

  useEffect(() => {
    refraseHandeler();
  }, [category]);
  return People.length > 0 ? (
    <div className="w-full h-screen ">
      <div className="w-full px-[5%]  flex items-center justify-between ">
        <h1 className="text-zinc-400  text-2xl font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line hover:text-[#6556CD]"
          ></i>
          People(
          <small className="text-lg text-zinc-600 ">{category}</small>)
        </h1>
        <div className="w-[80%] flex items-center">
          <TopNav />

          <div className="w-[3%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={People.length}
        next={GetPeople}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Cards data={People} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default People;
