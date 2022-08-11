import React, { Fragment } from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const onSave = (name, interviewer) => {
    transition(SAVING, true);
    // creates an interview obj from arguments in onSave
    const interview = {
      student: name,
      interviewer,
    };

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  };

  const onDelete = () => {
    transition(DELETE, true);

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && (
          <Form onSave={onSave} interviewers={interviewers} onCancel={back} />
        )}
        {mode === SAVING && <Status message={"Saving Interview"} />}
        {mode === DELETE && <Status message={"Deleting Interview"} />}
        {mode === CONFIRM && (
          <Confirm
            message={"Delete the interview?"}
            onCancel={back}
            onConfirm={onDelete}
          />
        )}
        {mode === EDIT && (
          <Form
            onSave={onSave}
            interviewers={interviewers}
            student={interview.student}
            onCancel={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={"Appointment not deleted, please try again"}
            onClose={back}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message={"Appointment not saved, please try again"}
            onClose={back}
          />
        )}
      </Fragment>
    </article>
  );
}
