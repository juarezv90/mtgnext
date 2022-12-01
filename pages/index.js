import { useState, createContext } from "react";
import Head from "next/head";
import Search from "../components/Search";
import SearchResults from "../components/SearchResults";
import SearchContext from "../context/SearchContext";

export default function Home() {
  const [userSearch, setUserSearch] = useState("") 

  return (
    <div>
      <Head>
        <title>The Crammed Mox</title>
        <meta
          name="description"
          content="The next best MTG card building application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchContext.Provider value={{userSearch, setUserSearch}}>
        <Search />
        <SearchResults />
      </SearchContext.Provider>
    </div>
  );
}
