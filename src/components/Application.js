import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const schedule = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={getInterviewersForDay(state, state.day)}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList days={state.days} value={state.day} onChange={setDay} />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
