import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // if replace is false, add the mode to history, if true we don't add mode to history
  const transition = (mode, replace = false) => {
    setMode(mode);
    
    if (!replace) {
      setHistory(prev => ([...prev, mode]));
    }
  };
  // go back by setting mode to previous one in history and remove the last item in history array.
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, -1)]);
    } 
  };
  
  return { mode, transition, back };
}