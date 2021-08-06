import React from "react";

import Header from "components/Appointments/Header";
import Empty from "components/Appointments/Empty";
import Show from "components/Appointments/Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";


import "components/Appointments/styles.scss";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
    .then(res => transition(SHOW, true))
    .catch(err => console.log(err.message))
    
  }


  function cancel() {

    transition(DELETING, true);

    cancelInterview(id)
    .then(res => transition(EMPTY))
    .catch(err => console.log(err.message))
    
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          {...interview}
          interviewers ={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
      <Confirm 
      message={"Are you sure you would like to delete?"} 
      onCancel={() => back()}
      onConfirm={cancel}
      />
      )}
    </article>
  );
}