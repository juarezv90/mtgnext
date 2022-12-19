import React from "react";

const Pagination = (props) => {
  const { totalCards, cardsPerPage, setCurrentPage } = props;

  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center">
        {pages.map(page => {
           return (
            <p key={page} className="p-2 mx-1 cursor-pointer" onClick={()=>{setCurrentPage(page)}}>
                {page}
            </p>
           )
        })}
    </div>
  )
}

export default Pagination;
