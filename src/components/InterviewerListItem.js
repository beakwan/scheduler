// PROPS
// id: number 
// name: string
// avatar: url 
// selected: boolean 
// setInterviewer: function 

import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {
 const { selected, setInterviewer, avatar, name } = props;

  const interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": selected
  })
  

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
