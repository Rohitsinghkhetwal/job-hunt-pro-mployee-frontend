import React, { useEffect, useState } from "react";
import { useDebounce } from "./UseDebounce";
import axios from "axios";
import useJobStore from "../Store/Store";

const Navbar: React.FC = () => {
  const { setJobs } = useJobStore();

  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const searchJobBasedLocation = async () => {
      try {
        if (debounceSearchTerm.trim() === "") return;

        const res = await axios.get(
          `${
            import.meta.env.VITE_PUBLIC_SERVER_URL
          }/search?location=${searchTerm}`
        );
        setJobs(res.data.data);
        console.log("this is the jobs", res.data.data);
      } catch (err) {
        console.log("Error fetching jobs");
      }
    };
    searchJobBasedLocation();
  }, [debounceSearchTerm]);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Brand Name */}
      <div className="text-2xl font-bold text-blue-600">
        JobHunt<span className="text-gray-800">Pro</span>
      </div>

      {/* Center: Search bar */}
      <div className="flex-1 max-w-xl mx-6">
        <div className="relative w-full flex">
          <input
            type="text"
            placeholder="Search for location"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <button className="px-6 py-2 bg-blue-400 text-white font-semibold rounded-full cursor-pointer hover:bg-blue-700 transition mx-2">
            Search
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
