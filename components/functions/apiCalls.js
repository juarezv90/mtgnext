import axios from "axios";

const url = "https://api.scryfall.com/cards/";

 export const cardCounter = async (data) => {
    const load = await axios.get(url + 'named?exact=' + data.card);
    const response = await load?.data;

    return await response;
  }

