import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage, setQuery } from "../store/searchSlice";
import { useNavigate } from "react-router";

function Header() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuestion = () => {
    if (!search) {
      return;
    }
    dispatch(setQuery(search));
    dispatch(setCurrentPage(1));
    navigate(`/questions/page/1?query=${search}`);
    setSearch("");
  };

  return (
    <div className="flex justify-center mt-4 fixed top-0 w-full mb-2 text-pretty">
      <input
        type="text"
        placeholder="search questions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[20rem] bg-white text-black sm:w-[30rem] outline-none px-3 py-1 rounded-md focus:border-yellow-200 border-4"
      />
      <button
        className="bg-green-400 rounded-md px-2 ml-1 hover:bg-green-600"
        onClick={searchQuestion}
      >
        seach
      </button>
    </div>
  );
}

export default Header;
