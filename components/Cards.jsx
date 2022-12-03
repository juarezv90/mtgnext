import Image from "next/image";
import React from "react";

const Cards = ({ item }) => {
  const card = item;
  
  let src = card?.image_uris?.normal
  if (card?.card_faces?.length > 0 && card?.card_faces[0].image_uris) {
   src = card?.card_faces[0]?.image_uris?.normal
  }

  const handleSrc = () => {
    if (card?.card_faces?.length > 0 && card?.card_faces[0].image_uris) {
      return card?.card_faces[1]?.image_uris?.normal
     }
     return card?.image_uris?.normal
  }
  const handleMouseOut = () => {
    if (card?.card_faces?.length > 0 && card?.card_faces[0].image_uris) {
      return card?.card_faces[0]?.image_uris?.normal
     }
     return card?.image_uris?.normal
  }

  return (
    <div>
      <img
        className="m-auto object-contain"
        src={src}
        alt={card?.name}
        onMouseOver={(e) => { e.target.src = handleSrc()}}
        onMouseOut={(e) => { e.target.src = handleMouseOut()}}
      />
    </div>
  );
};

export default Cards;
