import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cardCounter } from "../components/functions/apiCalls";
import { reform } from "../components/functions/deckFunctions";
import PowerLevel from "../components/PowerLevel";
import Cards from "../components/Cards";

const DeckCheck = () => {
  const [cardList, setCardList] = useState("");
  const [deck, setDeck] = useState(null);
  const [cardsFound, setCardsFound] = useState(null);
  const [card, setCard] = useState({});
  const [display, setDisplay] = useState(true);

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
    setCard(null);
    setCardsFound(null);
    document.getElementById("deckInput").value = "";
  };

  return (
    <div className="w-full">
      <div className="w-screen h-[25vh] mx-auto relative">
        <div className="absolute top-0 left-0 w-full h-[25vh] bg-black/40 z-10" />
        <Image
          fill
          cover
          src="/assets/mtgcards.jpg"
          alt="header"
        />
      </div>
      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-3 gap-8 pt-8">
        {/* start of card list enter */}
        <div className="flex flex-col mx-auto md:col-span-1 justify-start items-center">
          {/* card displayed on mouseover, disable on mobile and sm screen */}

          <textarea
            id="deckInput"
            style={{ resize: "none" }}
            className={
              display
                ? "border max-w-[75%] p-2 text-sm rounded mx-auto"
                : "hidden"
            }
            cols={40}
            rows="10"
            placeholder="Enter deck list"
            onChange={(e) => {
              setCardList(e.target.value);
            }}
          ></textarea>
          <button
            className={
              display ? "font-bold max-w-[75%] w-[100%] mt-2 " : "hidden"
            }
            onClick={() => {
              setDisplay(false);
              if (cardList !== "") loadSetDeck();
            }}
          >
            Submit
          </button>
          <button
            className="font-bold max-w-[75%] w-[100%] mt-2 mb-2"
            onClick={() => {
              clear();
              setDisplay(true);
            }}
          >
            Reset
          </button>
          <div
            className={
              display ? "hidden" : "hidden w-[70%] max-h-[35vh] md:inline mb-5"
            }
          >
            {card ? <Cards item={card} /> : ""}
          </div>
          <PowerLevel cardCount={cardsFound} />
        </div>
        {/* Start of card pop up display used for both mobile and screen */}
        <div className="md:col-span-2 columns-2 md:columns-2 lg:columns-3 p-2">
          <h1 className="text-xl font-bold shadow-md border-[1px] px-2 mb-1">
            Planeswalkers
          </h1>
          {cardFilterer(
            cardsFound,
            "Planeswalker",
            setCard,
            setMobileCardDisplay
          )}
          <h1 className="text-xl font-bold shadow-md border-[1px] px-2 mb-1">
            Creatures
          </h1>
          {cardFilterer(cardsFound, "Creature", setCard, setMobileCardDisplay)}
          <h1 className="text-xl font-bold shadow-md border-[1px] px-2 mb-1">
            Instants
          </h1>
          {cardFilterer(cardsFound, "Instant", setCard, setMobileCardDisplay)}
          <h1 className="text-xl font-bold shadow-md border-[1px] px-2 mb-1">
            Soceries
          </h1>
          {cardFilterer(cardsFound, "Sorcery", setCard, setMobileCardDisplay)}
          <h1 className="text-xl font-bold shadow-md border-[1px] px-2 mb-1">
            Enchantments
          </h1>
          {cardFilterer(
            cardsFound,
            "Enchantment",
            setCard,
            setMobileCardDisplay
          )}
          <h1 className="text-xl font-bold shadow-md border-[1px] px-2 mb-1">
            Artifacts
          </h1>
          {cardFilterer(cardsFound, "Artifact", setCard, setMobileCardDisplay)}
          <h1 className="text-xl font-bold shadow-md border-[1px] px-2 mb-1">
            Lands
          </h1>
          {cardFilterer(cardsFound, "Land", setCard, setMobileCardDisplay)}
        </div>
      </div>
      <div
        className={
          mobileCardDisplay
            ? "fixed top-0 left-0 bg-black/80 w-screen h-screen z-[100] p-10"
            : "hidden"
        }
        onClick={() => setMobileCardDisplay(false)}
      >
        <div className="max-w-[1240px] max-h-[50vh] mx-auto text-white grid">
          <Cards item={card} />
        </div>
      </div>
    </div>
  );
};

function cardFilterer(cards, value, setCard, setMobileCardDisplay) {
  return cards
    ?.filter((ele) => ele?.type_line?.match(`${value}`))
    ?.map((e) => (
      <p
        key={e}
        className="p-1 cursor-pointer"
        onMouseOver={() => setCard(e)}
        onClick={() => {
          setCard(e);
          setMobileCardDisplay(true);
        }}
      >
        {e.name}
      </p>
    ));
}

export default DeckCheck;
