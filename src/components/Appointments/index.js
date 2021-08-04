import React from "react";

import Header from "components/Appointments/Header";
import Empty from "components/Appointments/Empty";
import Show from "components/Appointments/Show";


import "components/Appointments/styles.scss";

export default function Appointments(props) {
  const {time, interview} = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />}
    </article>
  );
}