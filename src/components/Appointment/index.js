import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status'

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETE = 'DELETE';

export default function Appointment(props) {
  const  { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const onSave = (name, interviewer) => {
    transition(SAVING, true);
    // creates an interview obj from arguments in onSave
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(err => console.error(err))
  };

  const onDelete = (id) => {
    transition(DELETE, true);

    cancelInterview(id)
      .then(() => {
        transition(EMPTY)
      })
      .catch(err => console.error(err))
  }

  return (
    <article className="appointment">
      <Header time={time} />
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show student={interview.student} 
          interviewer={interview.interviewer}
          onEdit={() => {}}
          onDelete={() => onDelete(id)}
          />)
        }
        {mode === CREATE && (
          <Form 
            onSave={onSave}
            interviewers={interviewers}
            onCancel={() => back()}
          />)
        }
        {mode === SAVING && (
          <Status
            message={'Saving Interview'}
          />)
        }
        {mode === DELETE && (
          <Status
            message={'Deleting Interview'}
          />)
        }
      </Fragment>
    </article>
  );
};