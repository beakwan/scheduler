// PROPS 
// name: string 
// interviewers: array 
// interviewer: number 
// onSave: function 
// onCancel: function 


import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  
  const { interviewers, onSave, onCancel } = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    onCancel();
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={event => setName(event.target.value)}
            
            data-testid="student-name-input"
          
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
}