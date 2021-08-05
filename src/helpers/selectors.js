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
