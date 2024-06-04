import { useState } from "react";

function useMeditationConfig() {
  const [duration, setDuration] = useState(300);  // Default 5 minutes (300 seconds)
  const [inhale, setInhale] = useState(4);
  const [exhale, setExhale] = useState(12);

  const presetDurations = [
    { text: '5 minutes', value: 300 },
    { text: '10 minutes', value: 600 },
    { text: '15 minutes', value: 900 },
    { text: '20 minutes', value: 1200 },
    { text: '30 minutes', value: 1800 },
    { text: '60 minutes', value: 3600 },
  ];

  return {
    duration,
    setDuration,
    inhale,
    setInhale,
    exhale,
    setExhale,
    presetDurations
  };
}

export default useMeditationConfig;