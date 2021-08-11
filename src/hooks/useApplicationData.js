import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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
  

  //Function to update spots 
  function updateSpots(state) {
    //Find wanted day and index
    const currentDay = state.day;
    const currentDayObj = state.days.find(day => day.name === currentDay);
    const currentDayObjIndex = state.days.findIndex(day => day.name === currentDay);
    //get appt ids and find null appts
    const appointmentIds = currentDayObj.appointments;
    const freeAppointments = appointmentIds.filter(id => !state.appointments[id].interview);
    //null appts array length 
    const updatedSpots = freeAppointments.length;

    const updatedState = {...state};
    updatedState.days = [...state.days];
    const updatedDay = {...currentDayObj};
    updatedDay.spots = updatedSpots;
    updatedState.days[currentDayObjIndex] = updatedDay;

    return updatedState;
  }
  
   //Function to book interviews 
   function bookInterview(id, interview) {
  
    return axios.put(`/api/appointments/${id}`, {interview: {...interview}})
    .then(() => {
       const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
     
      setState(updateSpots({
        ...state,
        appointments: appointments
      }))
    })
    
  }
  
  
  //Function to cancel interviews
  function cancelInterview(id) {
    console.log("in cancel interview")
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
     
      setState(updateSpots({
        ...state,
        appointments: appointments
      }))
    })
    
  }

  return { state, setDay, bookInterview, cancelInterview }
}
