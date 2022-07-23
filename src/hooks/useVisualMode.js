import React, { useEffect, useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function transition(mode) {
    const newMode = setMode(mode);
    return newMode;
  }
  
  return { mode, transition };
}