import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const newHistory = [...history];
  //Function to transition to a new appointments mode
  const transition = (newMode, replace = false) => {
    //If we don't want to add previous mode to history, replace
    if (replace) {
     newHistory.pop();
    }
    
    setHistory(() => [...newHistory, newMode]);
    setMode(newMode);
    
  }
  //Function to go back to the previous mode
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