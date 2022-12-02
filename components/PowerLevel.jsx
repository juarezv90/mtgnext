import React, { useEffect, useState } from "react";
import Tracker from "./Tracker";
import { avgCMCCalc } from "./functions/deckFunctions";
import { drawCards, addMana, cntTutors, cntInteractions } from "./functions/powerFunctions"

function PowerLevel({ cardCount }) {
  const [tutors, setTutors] = useState(0);
  const [draw, setDraw] = useState(0);
  const [ramp, setRamp] = useState(0);
  const [interaction, setInteraction] = useState(0);
  const [avgCMC, setAvgCMC] = useState(0);

  useEffect(() => {
    clear();
    calcPower();
    setAvgCMC(avgCMCCalc(cardCount).toFixed(2));
    setDraw(drawCards(cardCount));
    setRamp(addMana(cardCount));
    setTutors(cntTutors(cardCount));
    setInteraction(cntInteractions(cardCount));
  }, [cardCount]);

  const clear = () => {
    setTutors(0);
    setDraw(0);
    setRamp(0);
    setInteraction(0);
  };

  const calcPower = () => {
    let cRamp = ramp / 2;
    let cDraw = draw / 2;
    let cmc = 2 / avgCMC;
    let cInter = interaction / 20;
    const formula = cmc + (cDraw + tutors + cRamp) / 2 + cInter;
    if (!formula || formula === Infinity) return 0;
    return formula.toFixed(2);
  };

  return (
    <div className="flex flex-col justify-center items-center mb-2 border p-4 rounded-xl">
      <h3 className="text-[20px] font-bold">Power Level: {avgCMC !== 0 ? calcPower() : 0}</h3>
      <div className="avgCMC">Avg CMC: {avgCMC}</div>
      <Tracker name="Tutors" counter={tutors} setCounter={setTutors} />
      <Tracker name="Draw" counter={draw} setCounter={setDraw} />
      <Tracker name="Ramp" counter={ramp} setCounter={setRamp} />
      <Tracker
        name="Interaction"
        counter={interaction}
        setCounter={setInteraction}
      />
    </div>
  );
}

export default PowerLevel;
