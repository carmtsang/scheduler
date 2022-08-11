import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { value, onChange } = props;

  const day = props.days.map((d) => {
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        selected={d.name === value}
        setDay={onChange}
      />
    );
  });

  return <ul>{day}</ul>;
}
