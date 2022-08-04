import React from 'react';
import PropTypes from 'prop-types';

import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const interviewersList = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => onChange(interviewer.id)}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersList}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};