import {  useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';


function reducer(state, action) {
  const { day, days, appointments, interviewers, interview } = action

  switch (action.type) {
    case SET_DAY: 
      return {...state, 
        day
      };

    case SET_APPLICATION_DATA: 
      return {
        ...state,
        days,
        appointments,
        interviewers
      };

    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.payload.id],
        interview: interview && {...interview}
      };
   
      const appointments = {
        ...state.appointments,
        [action.payload.id]: appointment
      };

      return {
        ...state,
        appointments
  
      }
    }
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
}


export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState)

  const setDay = day => dispatch({ type: SET_DAY, day });

  // api calls & setState of days, appointment & interviews
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => dispatch({ 
      type: SET_APPLICATION_DATA, 
      days: all[0].data, 
      appointments: all[1].data, 
      interviewers: all[2].data
      })
    )
    .catch(err => {
      console.log(err.response.status);
      console.log(err.response.headers);
      console.log(err.response.data);
    })
  }, []);

  const bookInterview = (id, interview) => {

    return axios.put(`http://localhost:8001/api/appointments/${id}`, interview)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
  }

  const cancelInterview = id => {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview: null })
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