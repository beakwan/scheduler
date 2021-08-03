import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  //Function to render correct message depending on props.spots
  const formatSpots = function(spots) {
    let number;
    let noun;

    spots === 0 ? number = "no" : number = spots;
    spots === 1 ? noun = "spot" : noun = "spots";

    return `${number} ${noun}`;
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}