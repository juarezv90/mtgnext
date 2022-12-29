import React from "react";

const Pagination = (postPerPage, totalCards) => {
  const pageNumbers = [];
 console.log(totalCards)
  for (let i = 1; i <= Math.ceil(totalCards / postPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div>
      <ul>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <a href="!#">{number}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
