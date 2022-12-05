import React, {useState, useContext } from "react";
import SearchContext from "../context/SearchContext";
import { FcSearch } from "react-icons/fc";

const Search = () => {
  const context = useContext(SearchContext);
  const [userInput, setUserInput] = useState("");

  const handleOnCLick = () => {
      context.setUserSearch(userInput);
  }
  return (
    <div className="w-full mt-20">
      <div className="max-w-[1240px] w-[100%] m-auto flex justify-center items-center p-10">
        <input
          className="border rounded p-1"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        
        <button style={{backgroundColor: "transparent", border: "none"}} onClick={handleOnCLick}>
          <FcSearch className="ml-1 cursor-pointer" size={20}  />
        </button>
        
      </div>
    </div>
  );
};

export default Search;
