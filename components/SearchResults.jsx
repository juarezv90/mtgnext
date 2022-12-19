import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import SearchContext from "../context/SearchContext";
import Cards from "./Cards";
import Pagination from "./Pagination";

const SearchResults = () => {
  const [searchedCards, setSearchedCards] = useState(null);
  const [displayData, setDisplayData] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const context = useContext(SearchContext);

  if (searchedCards?.length && searchedCards?.length > totalCards) {
    setTotalCards(searchedCards?.length);
  }

  const [cardsPerPage, setCardsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = searchedCards?.slice(firstCardIndex, lastCardIndex);

  const apiURL = "https://api.scryfall.com/cards/";

  const loadData = async () => {
    const load = await axios.get(`${apiURL}search?q=${context.userSearch}`);
    const loaded = await load?.data;
    setSearchedCards(() => loaded?.data);
    if (loaded?.has_more) {
      loadMoreCards(loaded?.next_page);
    }
  };

  const loadMoreCards = async (nextPage) => {
    const load = await axios.get(`${nextPage}`);
    const loaded = await load?.data;
    setSearchedCards((prev) => [...prev, ...loaded?.data]);
    if (loaded?.has_more) {
      loadMoreCards(loaded?.next_page);
    }
  };

  useEffect(() => {
    setSearchedCards(null);
    if (context.userSearch.length > 0) {
      loadData();
    }
  }, [context.userSearch]);

  const handleDisplayClick = (number) => {
    setDisplayData(true);
    setSelectedCard(number);
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
      <>
        <div className="row-start-2 md:col-start-2 md:row-start-1 text-white">
          <h1 className="text-lg font-bold md:text-5xl mb-2">
            {searchedCards[selectedCard]?.card_faces[0]?.name}
          </h1>
          <p className="mb-2 md:text-lg">
            {searchedCards[selectedCard]?.card_faces[0]?.type_line}
          </p>
          {searchedCards[selectedCard]?.card_faces[0]?.oracle_text
            ?.split("\n")
            .map((string) => {
              return <p className="mb-2 md:text-lg">{string}</p>;
            })}
        </div>
        <div className="md:col-start-2 md:row-start-2 text-white">
          <h1 className="text-lg font-bold md:text-5xl mb-2">
            {searchedCards[selectedCard]?.card_faces[1]?.name}
          </h1>
          <p className="mb-2 md:text-lg">
            {searchedCards[selectedCard]?.card_faces[1]?.type_line}
          </p>
          {searchedCards[selectedCard]?.card_faces[1]?.oracle_text
            ?.split("\n")
            .map((string) => {
              return <p className="mb-2 md:text-lg">{string}</p>;
            })}
        </div>
      </>
    );
  };

  function displayCardData() {
    if (searchedCards && searchedCards[selectedCard]?.card_faces?.length > 0) {
      return twoFaceData();
    } else if (searchedCards) {
      return singleSide();
    }
    return null;
  }

  function cardToShow(selectedCard) {
    if (searchedCards && searchedCards[selectedCard]?.card_faces?.length > 0) {
      return searchedCards[selectedCard]?.card_faces[0]?.image_uris?.png;
    } else if (searchedCards) {
      return searchedCards[selectedCard]?.image_uris?.png;
    }

    return null;
  }

  function displaySideTwo(selectedCard) {
    if (searchedCards && searchedCards[selectedCard]?.card_faces?.length > 0) {
      return (
        <img
          className="w-[100%] object-contain max-h-[100%]"
          src={searchedCards[selectedCard]?.card_faces[1]?.image_uris?.png}
          alt={"/"}
        />
      );
    }
    return null;
  }

  return (
    <div className="w-full">
      <div
        id="contentBox"
        className="max-w-[1240px] m-auto w-[100%] grid md:grid-cols-3 lg:grid-cols-4 gap-8 sm:grid-rows-2 p-4"
      >
        {currentCards?.map((card, index) => {
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
      </div>
      <Pagination
        totalCards={totalCards}
        cardsPerPage={cardsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

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
        <div className="max-w-[1240px] h-[100%] m-auto grid md:grid-cols-2 md:grid-rows-2 relative gap-20 overflow-y-scroll">
          <img
            className="w-[100%] object-contain max-h-[100%] md:col-start-1 md:row-start-1"
            src={cardToShow(selectedCard)}
            alt={"/"}
          />
          {displaySideTwo(selectedCard)}
          {displayCardData()}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
