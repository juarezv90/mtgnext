import { useState } from "react";
import Search from "../components/Search";
import SearchResults from "../components/SearchResults";
import SearchContext from "../context/SearchContext";



export default function Home() {
  const [userSearch, setUserSearch] = useState("");

  return (
    <div>
      <SearchContext.Provider value={{ userSearch, setUserSearch }}>
      <Search />
      <SearchResults />
    </SearchContext.Provider>
    </div>
  );
}
