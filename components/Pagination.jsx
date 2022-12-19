import React from "react";

const Pagination = (props) => {
  const { totalCards, cardsPerPage, setCurrentPage, currentPage } = props;

  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center">
        {pages.map(page => {
           return (
            <a href="/#search">
            <p key={page} className={page==currentPage? "p-2 mx-1 rounded cursor-pointer bg-black text-white" :"p-2 mx-1 cursor-pointer"} onClick={()=>{setCurrentPage(page)}}>
                {page}
            </p>
            </a>
           )
        })}
    </div>
  )
}

export default Pagination;
