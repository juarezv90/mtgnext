import Image from "next/image";
import React from "react";

const Cards = ({ item }) => {
  const card = item;
  
  let src = card?.image_uris?.normal
    let back
  if (card?.card_faces?.length > 0 && card?.card_faces[0].image_uris) {
   src = card?.card_faces[0]?.image_uris?.normal
   back = card?.card_faces[1]?.image_uris?.normal
  }

  return (
    <div>
      <Image
        className="m-auto"
        src={src}
        alt={card?.name}
        width={300}
        height={300}
      />
    </div>
  );
};

export default Cards;
