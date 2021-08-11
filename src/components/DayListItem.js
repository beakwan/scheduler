//PROPS
//name: string
//spots: number
//selected: boolean
//setDay: function

import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { selected, spots, setDay, name } = props;

  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
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
    <li data-testid="day" className={dayClass} onClick={() => setDay(name)} >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}
