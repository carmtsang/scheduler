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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({...prev, appointments }));
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({...prev, days: updateSpots(state, appointment)}))
      })
  }

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
   
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      setState(({...state, days: updateSpots(state, appointment)}))
    })
  };

  const updateSpots = (state, appointment) => {
    // using the current state, find  the current day object
    const currentDay = state.days.filter(d => d.name === state.day)[0];
    // loop thorugh the appointments,  if appointment is null, spots increase
    let spots = 0;
    for (let appointment of currentDay.appointments) {
      console.log(state.appointments[appointment])
      if (!state.appointments[appointment].interview) {
        spots++;
      }
    }

    // loop through the days array, if the day is not equal
    return state.days.map(dayObj => {
      if (dayObj !== currentDay) {
        return dayObj
      }
      const spot =  appointment.interview ? spots - 1: spots + 1

      return {...dayObj, 
        spots: spot}
    })
  }

  
  return { state, setDay, bookInterview, cancelInterview };
}