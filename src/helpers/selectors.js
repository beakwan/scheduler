export function getAppointmentsForDay(state, day) {
  const appointments = [];

  for (const obj of state.days) {
    if (obj.name === day) {
      for (const id of obj.appointments) {
        appointments.push(state.appointments[id]);
      }
    }
  }
  return appointments;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const id = interview.interviewer;
  const wantedInterview = {...interview, interviewer: state.interviewers[id]}
  return wantedInterview;
  
}