import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

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
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({...prev, appointments, days: updateSpots(state, appointments)}))
      })
  }

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setState(({...state, appointments, days: updateSpots(state, appointments)}))
    })
  };

  // using the current state, find the day object. if the appointment interview is null, spot +1
  // return the days array, replacing the spots in the day that matches currentDay
  const updateSpots = (state, appointments) => {
    const currentDay = state.days.filter(d => d.name === state.day)[0];

    let spots = 0;
    for (let appointment of currentDay.appointments) {
      if (!appointments[appointment].interview) {
        spots++;
      }
    };

    return state.days.map(dayObj => {
      if (dayObj !== currentDay) return dayObj;
    
      return {
        ...dayObj, 
        spots
      };
    })
  }


  return { state, setDay, bookInterview, cancelInterview };
}