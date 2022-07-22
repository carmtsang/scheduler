import React, { useState , useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const setDay = day => setState({...state, day });
  const setDays = days => setState(prev => ({...prev, days }));

  const dailyAppointments = [];

  useEffect(() => {
    const dayURL = `http://localhost:8001/api/days`
    axios.get(dayURL)
      .then(res =>
        setDays(res.data)
      );
  }, []);

  const appintmentComponent = dailyAppointments.map(appointment => {
    return (<Appointment 
      key={appointment.id}
      {...appointment} />
    );
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
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          {appintmentComponent}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
