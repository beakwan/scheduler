import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode) => {
    history.push(newMode);
    setMode(history[history.length - 1]);
  }
  
  const back = () => {
    history.pop();
    setMode(history[history.length - 1]);
  }
  
  return { mode, transition, back };
}