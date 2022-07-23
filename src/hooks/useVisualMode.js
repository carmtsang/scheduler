import React, { useEffect, useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = mode => {
    setMode(mode);
    setHistory(prev => [...prev, mode]);
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, -1)]);
    } 
  };
  
  return { mode, transition, back };
}