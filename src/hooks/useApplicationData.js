import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from 'helpers/selectors';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day });

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

  // day appointment array interview === null, 
  const updateSpots = (state, appointments) => {
    
    const currentDay = state.days.filter(d => d.name === state.day);
    let spots = 0;
    
    for (let appointment of currentDay.appointments) {
      if (!currentDay.appointments[appointment]) {
        spots++;
      }
    }

    const day = {...currentDay, spots}

  }

  const cancelInterview = id => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setState(prev => ({...prev }))
    })
  };

  const bookInterview = (id, interview) => {
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
        setState(prev => ({...prev }))
      })
  };

  return { state, setDay, bookInterview, cancelInterview };
}