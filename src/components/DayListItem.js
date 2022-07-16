import React from 'react';
import "components/DayListItem.scss"
import classNames from 'classnames';

const formatSpots = (spots) => {
  if (spots === 0) {
    return 'no spots remaining'
  }
  if (spots === 1) {
    return `${spots} spot remaining`
  }
  if (spots > 1) {
    return `${spots} spots remaining`
  }
};

export default function DayListItem(props) {
  const dayListClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  let remainingSpots = formatSpots(props.spots)

  return (
    <li onClick={() => props.setDay(props.name)}
      className={dayListClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{remainingSpots}</h3>
    </li>
  );
}