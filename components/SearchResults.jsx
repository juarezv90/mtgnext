import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import SearchContext from "../context/SearchContext";

const SearchResults = () => {
  const [searchedCards, setSearchedCards] = useState(null);
  const context = useContext(SearchContext);

  const apiURL = "https://api.scryfall.com/cards/";

  useEffect(() => {
    setSearchedCards(null);
    
    const loadData = async () => {
      const load = await axios.get(`${apiURL}search?q=${context.userSearch}`);
      const loaded = await load?.data;
      setSearchedCards(() => loaded?.data);
    };

    if(context.userSearch.length > 0) {
      loadData();
    }
  }, [context.userSearch]);

//   console.log(searchedCards);
  return (
    <div className="w-full">
      <div className="max-w-[1240px] m-auto w-[100%] grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {searchedCards?.map((card) => {return <img className="p-2" src={card?.image_uris?.png} alt={card?.name} />})}
      </div>
    </div>
  );
};

export default SearchResults;

// <Image src={card?.image_uris?.normal} alt="/" />