import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const  { time, interview } = props;

  return (
    <article className="appointment">
      <Header time={time} />
      <Fragment>
      {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />}
      </Fragment>
    </article>
  );
};