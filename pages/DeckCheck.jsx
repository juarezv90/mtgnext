import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cardCounter } from "../components/functions/apiCalls";
import { reform } from "../components/functions/deckFunctions";
import PowerLevel from "../components/PowerLevel";

const DeckCheck = () => {
  const [cardList, setCardList] = useState("");
  const [deck, setDeck] = useState(null);
  const [cardsFound, setCardsFound] = useState(null);

  const [mobileCardDisplay, setMobileCardDisplay] = useState(false);

  useEffect(() => {
    async function load() {
      if (deck !== null) {
        const cards = await Promise.all(deck?.map((c) => cardCounter(c))).catch(
          (e) => console.log(e)
        );
        setCardsFound(cards);
      }
    }
    load();
  }, [deck]);

  const loadSetDeck = () => {
    setDeck((prev) => reform(cardList));
  };

  const clear = () => {
    setCardList("");
    setDeck(null);
    setCardsFound(null);
    document.getElementById("deckInput").value = "";
    document.getElementById("image").src ="";
  };

  const handleMouseOver = (e) => {
    document.getElementById("image").src = e.image_uris.normal;
  };

  const handleCardClick = (e) => {
    document.getElementById('mobileCard').src = e.image_uris.png;
    setMobileCardDisplay(true)
  }

  return (
    <div className="w-full">
      <div className="w-screen h-[30vh] lg:h-[40vh] mx-auto relative">
        <div className="absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/40 z-10" />
        <Image
          layout="fill"
          objectFit="cover"
          src="/assets/mtgcards.jpg"
          alt="header"
        />
      </div>
      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-3 gap-8 pt-8">
        {/* start of card list enter */}
        <div className="flex flex-col mx-auto md:col-span-1 justify-start items-center">
          <div className="hidden max-h-[40vh] md:inline mb-5 w-[80%] h-[40vh] border">
            <img className="hidden md:inline md:w-full md:h-full" id="image" src="" alt="" />
          </div>
          <PowerLevel cardCount={cardsFound} />
          <textarea
            id="deckInput"
            style={{ resize: "none" }}
            className="border max-w-[75%] p-2 text-sm rounded mx-auto"
            cols={40}
            rows="10"
            placeholder="Enter deck list"
            onChange={(e) => {
              setCardList(e.target.value);
            }}
          ></textarea>
          <button
            className="font-bold max-w-[75%] w-[100%] mt-2"
            onClick={() => (cardList !== "" ? loadSetDeck() : null)}
          >
            Submit
          </button>
          <button
            className="font-bold max-w-[75%] w-[100%] mt-2"
            onClick={clear}
          >
            Reset
          </button>
        </div>
        {/* Start of card display */}
        <div className="md:col-span-2 columns-2 md:columns-4 p-2">
          {cardsFound?.map((e) => (
            <p
              className="p-1 cursor-pointer"
              onMouseOver={() => {
                handleMouseOver(e);
              }}
              onClick={() => {handleCardClick(e)}}
            >
              {e.name}
            </p>
          ))}
        </div>
      </div>
      <div className={mobileCardDisplay ? "fixed top-0 left-0 bg-black/80 w-screen h-screen z-[100] p-10" : "hidden"} onClick={()=> setMobileCardDisplay(false)}>
        <div className="max-w-[1240px] mx-auto text-white grid">
          <img id="mobileCard" className="mx-auto w-[80%] md:w-[400px] rounded" src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DeckCheck;
