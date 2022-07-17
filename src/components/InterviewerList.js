import React from 'react';

import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  const interviewersList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        {...interviewer}
        selected={interviewer.id === props.interviewer}
        setInterviewer={props.setInterviewer}
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
  )
}