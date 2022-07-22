// loop through state, if it matches the day, for each of the appointments, if the appointment obj matches, push it to the results array

export function getAppointmentsForDay(state, day) {
  let results = [];
  for (let dayAppointments of state.days) {
    if (dayAppointments.name === day) {
      dayAppointments.appointments.forEach(appointment => results.push(state.appointments[appointment]))
    }
  };

  return results;
};