import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
  const  { time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  return (
    <article className="appointment">
      <Header time={time} />
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show student={interview.student} 
          interviewer={interview.interviewer}
          onEdit={() => {}}
          onDelete={() => {}}
          />)
        }
        {mode === CREATE && (
        <Form 
          onSave={() => {}}
          interviewers={interviewers}
          onCancel={() => back()}
        />)}
      </Fragment>
    </article>
  );
};