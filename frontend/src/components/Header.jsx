import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setFilter, setQuery } from "../store/searchSlice";
import { useNavigate, useLocation, useParams } from "react-router";

const filterOptions = [
  "MCQ",
  "ANAGRAM",
  "CONTENT_ONLY",
  "CONVERSATION",
  "READ_ALONG",
];
function Header() {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || "";
    const filterParam = searchParams.get("filter");
    const parsedFilters = filterParam ? filterParam.split(",") : [];
    dispatch(setQuery(query));
    setSearch(query);
    dispatch(setFilter(parsedFilters));
    setSelectedFilters(parsedFilters);
  }, []);
  const searchQuestion = () => {
    if (search.length > 0) dispatch(setQuery(search));
    dispatch(setFilter(selectedFilters));
    dispatch(setCurrentPage(1));
    const filterParam = selectedFilters.length
      ? `filter=${selectedFilters.join(",")}`
      : "";
    navigate(`/questions/page/1?query=${search}&${filterParam}`);
    setSearch("");
  };
  useEffect(() => {
    searchQuestion();
  }, [selectedFilters]);
  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };
  return (
    <div className="fixed top-0 w-full mb-2 text-pretty bg-slate-200 z-50">
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="search questions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[20rem] bg-white text-black sm:w-[30rem] outline-none h-12 px-3 py-1 rounded-md focus:border-yellow-200 border-4"
        />
        <button
          className="bg-green-400 rounded-md px-2 ml-1 hover:bg-green-600 box-border h-10"
          onClick={searchQuestion}
        >
          search
        </button>
      </div>

      <div className="flex gap-x-2 overflow-x-auto my-2 scroll-container box-border px-2 sm:justify-center">
        {filterOptions.map((filter) => (
          <div key={filter} className="flex">
            <input
              type="checkbox"
              id={filter}
              value={filter}
              checked={selectedFilters.includes(filter)}
              onChange={() => handleFilterChange(filter)}
            />
            <label htmlFor={filter}>{filter}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
