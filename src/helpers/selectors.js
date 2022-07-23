// loop through state.days, if it matches the day, for each of the appointments, if the appointment obj matches, push it to the results array

export function getAppointmentsForDay(state, day) {
  let results = [];
  for (let dayAppointments of state.days) {
    if (dayAppointments.name === day) {
      dayAppointments.appointments.forEach(appointment => results.push(state.appointments[appointment]))
    }
  };

  return results;
};

// loop through state.interviewers, if match, return interview obj with student name & interviewer obj
export function getInterview(state, interview) {
  if (interview === null) return null;

  for (let person in state.interviewers) {
    if (state.interviewers[person].id === interview.interviewer) {
      return {
        student: interview.student,
        interviewer: state.interviewers[person]
      }
    }
  };
};