import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointments/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";



export default function Application(props) {
  //Set state for day, days, and appointments
  const [state, setState] = useState({
    day: "Monday", 
    days: [], 
    appointments: {},
    interviewers: {}
  })

  //Function for setDay state
  const setDay = day => setState({ ...state, day });
  
  //Get data for days, appointments and interviewers
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    }).catch(error => console.log(error))
  }, [])

  //Get proper appointments and interviewers for each given day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  //Function to book interviews 
  function bookInterview(id, interview) {

    return axios.put(`/api/appointments/${id}`, {interview: {...interview}})
    .then(res => {
       const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
     
      setState({
        ...state,
        appointments: appointments
      })
    })
    .catch(err => console.log(err.message))

  }

  //Function to cancel interviews
  function cancelInterview(id) {
    console.log("in cancel interview")
    
    
  }

  //map over data to compile dynamic appointments list
  const parsedAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}
    interviewers={dailyInterviewers}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    />
});


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
