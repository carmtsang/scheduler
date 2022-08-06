import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
  const { onSave, onCancel, interviewers } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const reset = () => {
    setStudent('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const validate = () => {
    if (student === "") {
      setError('Student name cannot be blank');
      return;
    }

    if (interviewer === null) {
      setError('Please select an interviewer');
      return
    }

    onSave(student, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
};