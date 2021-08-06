import React from "react";

import Header from "components/Appointments/Header";
import Empty from "components/Appointments/Empty";
import Show from "components/Appointments/Show";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";


import "components/Appointments/styles.scss";

export default function Appointment(props) {
  const {time, interview} = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

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
          interviewers ={[]}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}