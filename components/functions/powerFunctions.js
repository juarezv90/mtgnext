export const drawCards = (cardCount) => {
 return cardCount !== undefined && cardCount?.length > 0
      ? cardCount?.reduce(
          (sum, val) =>
            val?.oracle_text?.match(
              /(draw | deals combat damage | whenever you cast)/i
            ) &&
            !val?.oracle_text?.match(/(may pay| draw step)/i) &&
            val?.cmc <= 4
              ? sum + 1
              : sum,
          0
        )
      : 0;

  // cardCount?.map((val) => {
  //   return ? console.log(`${val?.name} /n ${val?.oracle_text} /n  ${val?.cmc}`) : 0;
  // })
};

export const addMana = (cardCount) => {
  const lands = ["land", "mountain", "plains", "island", "forest", "swamp"];
  const landRegExp = new RegExp(lands.join("|"), "i");
  const nonLand = ["exile", "target creature", "controller"];
  const nonLandRamp = new RegExp(nonLand.join("|"), "i");
  
  return cardCount !== undefined && cardCount?.length > 0
      ? cardCount?.reduce(
          (sum, val) =>
            (val?.oracle_text?.match(/(add)/i) ||
              val?.oracle_text?.match(landRegExp)) &&
            val?.cmc < 3 &&
            !val?.type_line?.match("Land") &&
            !val?.oracle_text?.match(nonLandRamp)
              ? sum + 1
              : sum,
          0
        )
      : 0;

  //TEST FUNCTION FOR WHATS IN  ABOVE FUNCTION
  // cardCount?.map((val) => {
  //   return (val?.oracle_text?.match(/(add)/i) ||
  //   val?.oracle_text?.match(landRegExp)) &&
  // val?.cmc <= 2 &&
  // !val?.type_line?.match("Land") &&
  // !val?.oracle_text?.match(nonLandRamp) ? console.log(`${val?.name} /n ${val?.oracle_text} /n  ${val?.cmc}`) : 0;
  // })
};

export const cntTutors = (cardCount) => {
  const lands = [
    "land",
    "mountain",
    "plains",
    "island",
    "forest",
    "swamp",
    "saga",
  ];
  const landRegExp = new RegExp(lands.join("|"), "i");
 
 return cardCount !== undefined && cardCount?.length > 0
      ? cardCount?.reduce(
          (sum, val) =>
            val?.oracle_text?.match(/(Search your library for)/i) &&
            val?.cmc <= 3 &&
            !val?.oracle_text?.match(landRegExp)
              ? sum + 1
              : sum,
          0
        )
      : 0;
};

export const cntInteractions = (cardCount) => {
  const interactions = [
    "destroy",
    "target",
    "extra turn",
    "gain 1 life",
    "lose life",
    "Create",
    "gain",
    "search",
    "enters the battlefield",
    "Each opponent",
    "sacrifice",
    "proliferate",
    "you control get",
    "return",
    "onto the battlefield",
    "sacrifices",
    "lose 1 life",
    "Landfall",
    "opponent loses",
    "upkeep",
    "leaves the battlefield",
    "may look at",
    "Each Creature",
    "to the battlefield",
    "flash",
    "exile",
    "phase",
    "Overload",
    "deals damage",
    "deals",
    "damage",
    "until end of turn",
    "you control",
    "can't be",
    "haste",
    "lands are",
    "play with the top",
    "attacks",
    "deal damage",
    "scry",
    "win the game",
    "don't untap",
    "dies",
  ];
  const interactionRegExp = new RegExp(interactions.join("|"), "i");
   return cardCount !== undefined && cardCount?.length > 0
      ? cardCount?.reduce(
          (sum, val) =>
            val?.oracle_text?.match(interactionRegExp) ? sum + 1 : sum,
          0
        )
      : 0;

  //TEST FUNCTION FOR WHATS IN  ABOVE FUNCTION
  // cardCount?.map((val) => {
  //   return val?.oracle_text?.match(interactionRegExp)
  //     ? console.log(`${val?.name} /n ${val?.oracle_text} /n  ${val?.cmc}`)
  //     : 0;
  // });
};
