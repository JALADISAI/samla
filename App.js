import React, { useState, useEffect } from "react";

const App = () => {
  const [time, setTime] = useState(7200); 
  const [timerOn, setTimerOn] = useState(false);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const handleStartStop = () => {
    setTimerOn((prev) => !prev);
  };

  const handleTimeChange = (event) => {
    const inputTime = event.target.value;
    const [hours, minutes, seconds] = inputTime.split(":").map(Number);
    setTime(hours * 3600 + minutes * 60 + seconds);
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      <input
        type="text"
        value={formatTime(time)}
        onChange={handleTimeChange}
        disabled={timerOn}
      />
      <button onClick={handleStartStop}>{timerOn ? "Stop" : "Start"}</button>
    </div>
  );
}

export default App;
