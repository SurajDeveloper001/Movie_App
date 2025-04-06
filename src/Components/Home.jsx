import { useEffect, useState } from "react";
import Header from "../templates/Header";
import SideBar from "../templates/SideBar";
import TopNav from "../templates/TopNav";
import axios from "../utils/axios";
import VCards from "../templates/VCards";
import Dropedown from "../templates/Dropedown";

function Home() {
  document.title = "Move | Home";
  const [wallpaper, setwallpaper] = useState(null);
  const [trnding, settrnding] = useState(null);
  const [category, setcategory] = useState("all");
  const [showSidebar, setShowSidebar] = useState(false);

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let ramdom =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(ramdom);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTrinding = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrnding(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetTrinding();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  return wallpaper && trnding ? (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-[#6556CD] text-white p-2 rounded-full shadow-lg"
        >
          <i
            className={`ri-${showSidebar ? "close" : "menu"}-line text-xl`}
          ></i>
        </button>
      </div>

      {/* Sidebar - hidden on mobile by default, shown when toggled */}
      <div
        className={`${
          showSidebar ? "fixed inset-0 z-40 block" : "hidden"
        } md:block md:relative md:w-[20%] h-full`}
      >
        <SideBar closeSidebar={() => setShowSidebar(false)} />
      </div>

      {/* Main content */}
      <div className="w-full md:w-[80%] h-full overflow-auto">
        <div className="px-4 md:px-0">
          <TopNav />
        </div>
        <Header data={wallpaper} />
        <div className="p-3 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-400">
            Trending
          </h1>
          <Dropedown
            title="Filter"
            options={["tv", "movie", "all"]}
            fun={(e) => setcategory(e.target.value)}
          />
        </div>

        <VCards data={trnding} />
      </div>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center bg-[#1F1E24] text-white text-2xl">
      <p>Loading...</p>
    </div>
  );
}

export default Home;
