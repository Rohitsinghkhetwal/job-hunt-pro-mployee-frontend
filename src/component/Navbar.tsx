import React, { useEffect, useState } from "react";
import { useDebounce } from "./UseDebounce";
import useJobStore from "../Store/Store";

const Navbar: React.FC = () => {
  const { fetchJobs, setSearchTerm } = useJobStore();

  const [searchTerm, setSearch] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearchTerm(debounceSearchTerm);
    fetchJobs();
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
            onChange={(e) => setSearch(e.target.value)}
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
