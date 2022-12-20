import React from "react";

const Pagination = (props) => {
  const { totalCards, cardsPerPage, setCurrentPage, currentPage } = props;

  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pages.push(i);
  }

  function handlePrev() {
    if(currentPage != 1) {
      setCurrentPage((prev) => prev-1);
    }
  }

  function handleNext() {
    if(currentPage != Math.ceil(totalCards/cardsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevCards() {
    if(totalCards > 0) {
      return (
        <a href="/#search">
        <p onClick={handlePrev}>
          Prev
        </p>
        </a>
      )
    }
  }

  function nextCards() {
    if(totalCards > 0) {
      return (
        <a href="/#search">
        <p onClick={handleNext}>
          Next
        </p>
        </a>
      )
    }
  }

  return (
    <div className="flex justify-center items-center">
        {prevCards()}
        {pages.map(page => {
           return (
            <a href="/#search">
            <p key={page} className={page==currentPage? "p-2 mx-1 rounded cursor-pointer bg-black text-white" :"p-2 mx-1 cursor-pointer"} onClick={()=>{setCurrentPage(page)}}>
                {page}
            </p>
            </a>
           )
        })}
        {nextCards()}
    </div>
  )
}

export default Pagination;
