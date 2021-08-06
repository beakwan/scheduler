import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  
  const transition = (newMode, replace = false) => {
    
    if (replace) {
      history.pop();
    }
    history.push(newMode);
    console.log(history)
    setHistory(history);
    setMode(history[history.length - 1]);
  }
  
  const back = () => {
    if (history.length > 1) {
      history.pop();
    }
    console.log(history)
    setHistory(history);
    setMode(history[history.length - 1]);
  }
  
  return { mode, transition, back };
}