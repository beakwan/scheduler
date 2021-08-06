import React from "react";

import Header from "components/Appointments/Header";
import Empty from "components/Appointments/Empty";
import Show from "components/Appointments/Show";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


import "components/Appointments/styles.scss";

export default function Appointment(props) {
  const {time, interview, interviewers, bookInterview, id} = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
    .then(res => transition(SHOW))
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
    </article>
  );
}