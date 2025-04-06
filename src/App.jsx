import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movies from "./Components/Movies";
import Tv from "./Components/Tv";
import People from "./Components/People";
import Moviedetails from "./Components/Moviedetails";
import TvDetails from "./Components/TvDetails";
import PersonDetalis from "./Components/PersonDetalis";

function App() {
  return (
    <div className=" bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/Popular" element={<Popular />} />
        <Route path="/Movie" element={<Movies />} />
        <Route path="/Movie/Details/:id" element={<Moviedetails />} />
        <Route path="/Tv" element={<Tv />} />
        <Route path="/Tv/Details/:id" element={<TvDetails />} />
        <Route path="/People" element={<People />} />
        <Route path="/Person/Details/:id" element={<PersonDetalis />} />
      </Routes>
    </div>
  );
}

export default App;
