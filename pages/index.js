import { useState, createContext } from "react";
import Head from "next/head";
import Search from "../components/Search";
import SearchResults from "../components/SearchResults";
import SearchContext from "../context/SearchContext";

export default function Home() {
  const [userSearch, setUserSearch] = useState("");
  function Searcher() {
    return (
      <SearchContext.Provider value={{ userSearch, setUserSearch }}>
        <Search />
        <SearchResults />
      </SearchContext.Provider>
    );
  }

  return (
    <div>
      <Searcher />
    </div>
  );
}
