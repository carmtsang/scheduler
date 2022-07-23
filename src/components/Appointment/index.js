import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss'

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';

export default function Appointment(props) {
  const  { time, interview } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  
  return (
    <article className="appointment">
      <Header time={time} />
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => console.log('Clicked onAdd')} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
          />
        )}
      </Fragment>
    </article>
  );
};