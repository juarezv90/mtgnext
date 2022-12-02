export const reform = (holder) => {
  const exp = [" \\(.{0,6}\\).\\d{0,4}[ -z]", " ", "[0-9]"];
  const regex = new RegExp(exp.join('|'),"ig");
  const data = holder.replace("", "");
  const dataArray = data.split("\n");
  const converted = dataArray?.map((element) => ({
    count: parseInt(element),
    card: element.replace(regex, ""),
  }));
  return converted;
};

export const showCard = (cardDisplay) => {
  if (cardDisplay === null) return;
  if (cardDisplay[0]?.image_uris) {
    return (
      <img
        src={cardDisplay[0]?.image_uris?.png}
        alt=""
        onClick={(e) => {
          e.target.src === cardDisplay[0]?.image_uris?.png
            ? (e.target.src = cardDisplay[1]?.image_uris?.png)
            : (e.target.src = cardDisplay[0]?.image_uris?.png);
        }}
      />
    );
  }
  return <img src={cardDisplay?.image_uris?.png} alt="" />;
};

export const avgCMCCalc = (cardCount) => {
  const totalMana =
    cardCount !== undefined && cardCount?.length > 0
      ? cardCount?.reduce(
          (sum, val) =>
            (!val?.type_line?.match("Land") ? sum + val?.cmc : sum),
          0
        )
      : 0;
  const totalNonLand =
    cardCount !== undefined && cardCount?.length > 0
      ? cardCount?.reduce(
          (sum, val) => (!val?.type_line?.match("Land") ? sum + 1 : sum),
          0
        )
      : 0;
      if(!(totalMana/totalNonLand)) return 0;
    const avgBoth = (totalMana/totalNonLand + totalMana/100)/2
  return avgBoth;
};
