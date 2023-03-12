import React, {useState, useContext } from "react";
import SearchContext from "../context/SearchContext";
import { FcSearch } from "react-icons/fc";

const Search = () => {
  const context = useContext(SearchContext);
  const [userInput, setUserInput] = useState("");

  const handleOnCLick = (event) => {
      event.preventDefault();
      context.setUserSearch(userInput);
  }
  return (
    <div className="w-full mt-20" id="search">
      <div className="max-w-[1240px] w-[100%] m-auto flex justify-center items-center p-10">
        <form onSubmit={handleOnCLick} className="flex justify-center">
        <input
          className="border rounded-2xl p-1 px-5 w-[80%]"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        
        <button style={{backgroundColor: "transparent", border: "none"}} onClick={handleOnCLick}>
          <FcSearch className="ml-1 cursor-pointer" size={20}  />
        </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
