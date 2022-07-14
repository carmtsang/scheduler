import React from 'react';
import "components/DayListItem.scss"
import classNames from 'classnames';

export default function DayListItem(props) {
  const dayListClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining'
    }
    if (spots === 1) {
      return `${spots} spot remaining`
    }
    if (props.spots > 1) {
      return `${spots} spots remaining`
    }
  };

  return (
    <li onClick={() => props.setDay(props.name)}
      className={dayListClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}