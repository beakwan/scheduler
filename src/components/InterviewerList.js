// PROPS 
// interviewers: array 
// interviewer: number 
// setInterviewer: function 

import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  
  const { interviewers, value, onChange } = props;

  const parsedInterviewers = interviewers.map(interviewer => {
    return <InterviewerListItem  
    key={interviewer.id} 
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === value}
    setInterviewer={event => onChange(interviewer.id)} />
  })
  

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  );
  
}


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};