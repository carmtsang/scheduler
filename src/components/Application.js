import React, { useState , useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day });

  let dailyAppointments = [];
 
  // api calls & setting state of days, appointment & interviews
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(all => {
      // set state after retrieving api.
      setState(prev =>({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
    .catch(err => {
      console.log(err.response.status);
      console.log(err.response.headers);
      console.log(err.response.data);
    })
  }, []);

  // get arrays for daily appointments & interviews
  dailyAppointments = getAppointmentsForDay(state, state.day);
  let dailyInterviewers = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    console.log(id, interview)
    // create the appointment object w/ values copied form existing appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // replace existing record with the matching id.
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments });

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({...prev}))
      })
      .catch(err => {
        console.log(err)
      });
  };

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state,appointment.interview);

    return (<Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview} 
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      />
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
          {schedule}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
