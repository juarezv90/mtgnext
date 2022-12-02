import React from "react";

function increase(counter, setCounter) {
  setCounter(++counter);
}

function decrease(counter, setCounter) {
  if (counter > 0) {
    setCounter(--counter);
  }
}

function Tracker(props) {
  let name = props.name;

  return (
    <div className="flex justify-center items-center">
      <span className="mr-5">{name}:</span>
      <div className="trackerLayout">
        <span
          className="mx-2 text-lg cursor-pointer p-2 hover:font-bold"
          onClick={() => {
            increase(props.counter, props.setCounter);
          }}
        >
          +
        </span>
        <span className="font-bold text-lg">{props.counter}</span>

        <span
          className="mx-2 text-lg cursor-pointer p-2 hover:font-bold"
          onClick={() => {
            decrease(props.counter, props.setCounter);
          }}
        >
          -
        </span>
      </div>
    </div>
  );
}

export default Tracker;
