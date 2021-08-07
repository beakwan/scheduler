import { useState } from "react";


export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);

  
  const transition = (newMode, replace = false) => {
    setHistory(prev => {
      if (replace) {
        prev.slice(0, prev.length - 1);
      }
      console.log([...prev, newMode])
      return [...prev, newMode]
    })
    
  }
  
  const back = () => {
    setHistory(prev => {
      if (prev.length > 1) {
        return prev.slice(0, prev.length - 1);

      }
    })
   
  }

  const mode = history[history.length - 1];
  
  return { mode, transition, back };
}