import React from 'react';
import Header from './Header';

import 'components/Appointment/styles.scss'

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time}/>
    </article>
  );
};