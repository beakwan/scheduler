import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const newHistory = [...history];

  const transition = (newMode, replace = false) => {

    if (replace) {
     newHistory.pop();
    }
    
    setHistory(() => [...newHistory, newMode]);
    setMode(newMode);
    
  }
  
  const back = () => {
    if (newHistory.length > 1) {
     newHistory.pop();
    }
    console.log(newHistory);
    setHistory(() => [...newHistory]);
    setMode(newHistory[newHistory.length - 1]);
  }
  
  return { mode, transition, back };
}