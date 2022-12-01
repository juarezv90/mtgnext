import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useContext, use } from "react";
import SearchContext from "../context/SearchContext";
import Cards from "./Cards";

const SearchResults = () => {
  const [searchedCards, setSearchedCards] = useState(null);
  const [displayData, setDisplayData] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const context = useContext(SearchContext);

  const apiURL = "https://api.scryfall.com/cards/";

  useEffect(() => {
    setSearchedCards(null);

    const loadData = async () => {
      const load = await axios.get(`${apiURL}search?q=${context.userSearch}`);
      const loaded = await load?.data;
      setSearchedCards(() => loaded?.data);
    };

    if (context.userSearch.length > 0) {
      loadData();
    }
  }, [context.userSearch]);

  const handleDisplayClick = (number) => {
    setDisplayData(true);
    setSelectedCard(number);
  };

  const backface = () => {
    console.log(searchedCards[selectedCard]?.card_faces);
    return (
      <img
        className="m-auto row-start-2"
        src={searchedCards[selectedCard]?.card_faces[1]?.image_uris?.png}
        alt={"/"}
        width={300}
        height={300}
      />
    );
  };

  const singleSide = () => {
    return (
      <div className="text-white md:text-xl">
        <h1 className="text-lg font-bold md:text-4xl pb-2">
          {searchedCards != null ? searchedCards[selectedCard]?.name : null}
        </h1>
        <p className="pb-2">
          {searchedCards != null
            ? searchedCards[selectedCard]?.type_line
            : null}
        </p>
        {searchedCards != null
          ? searchedCards[selectedCard]?.oracle_text
              ?.split("\n")
              .map((string) => {
                return <p>{string}</p>;
              })
          : null}
      </div>
    );
  };

  const twoFaceData = () => {
    return (
      <div className="text-white md:text-xl row-start-1 row-end-2">


        <h1 className="text-lg font-bold md:text-4xl pb-2">
          {searchedCards[selectedCard]?.card_faces[0]?.name}
        </h1>
        <p className="pb-2">
          {searchedCards[selectedCard]?.card_faces[0]?.type_line}
        </p>
        {searchedCards[selectedCard]?.card_faces[0]?.oracle_text
          ?.split("\n")
          .map((string) => {
            return <p className="pb-2">{string}</p>;
          })}


        <h1 className="text-lg font-bold md:text-4xl pb-2">
          {searchedCards[selectedCard]?.card_faces[1]?.name}
        </h1>
        <p className="pb-2">
          {searchedCards[selectedCard]?.card_faces[1]?.type_line}
        </p>
        {searchedCards[selectedCard]?.card_faces[1]?.oracle_text
          ?.split("\n")
          .map((string) => {
            return <p className="pb-2">{string}</p>;
          })}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div
        id="contentBox"
        className="max-w-[1240px] m-auto w-[100%] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {searchedCards?.map((card, index) => {
          return (
            <div
              key={index}
              onClick={() => handleDisplayClick(index)}
              className="relative col-span-1 cursor-pointer"
            >
              <Cards key={index} item={card} />
            </div>
          );
        })}

        {/* Is the data display for cards */}
        <div
          onClick={() => {
            setDisplayData(false);
          }}
          className={
            displayData
              ? "w-full pt-20 bg-black/80 h-[100%] z-[100] fixed top-0 left-0"
              : "hidden"
          }
        >
          <span
            onClick={() => setDisplayData(false)}
            className="absolute z-[1000]  cursor-pointer font-bold text-red-600 text-2xl right-2 top-0 rounded-full p-2 md:text-4xl"
          >
            X
          </span>
          <div className="max-w-[1240px] h-[100%] m-auto grid md:grid-cols-2 md:grid-rows-2 p-10 relative gap-20 overflow-y-scroll sm:overflow-auto md:p-20">
            <img
              className="m-auto md:row-start-1 md:col-start-1"
              src={
                searchedCards != null
                  ? searchedCards[selectedCard]?.card_faces?.length > 0
                    ? searchedCards[selectedCard]?.card_faces[0]?.image_uris
                        ?.png
                    : searchedCards[selectedCard]?.image_uris?.png
                  : null
              }
              alt={"/"}
              width={300}
              height={300}
            />
            {searchedCards != null
              ? searchedCards[selectedCard]?.card_faces?.length > 0
                ? backface()
                : null
              : null}
            {searchedCards != null
              ? searchedCards[selectedCard]?.card_faces?.length > 0
                ? twoFaceData()
                : singleSide()
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
