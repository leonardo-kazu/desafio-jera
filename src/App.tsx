import { useEffect, useState } from 'react';
import Clock from './components/Clock';

function App() {
  const [timesRun, setTimesRun] = useState<number>(0);

  const [pomodoro, setPomodoro] = useState<number>(60 * 25);
  const [stop, setStop] = useState(60 * 5);

  const [pomodoroTimer, setPomodoroTimer] = useState<number>(pomodoro);
  const [runPomodoro, setRunPomodoro] = useState<boolean>(false);
  const [stopTimer, setStopTimer] = useState<number>(stop);
  const [stopActive, setStopActive] = useState<boolean>(false);
  const [runStop, setRunStop] = useState<boolean>(false);

  // Use effect for pomodoro timer
  useEffect(() => {
    // Checking if the pomodoro has been initiated and the stop timer isn't
    // running
    if (runPomodoro && !runStop) {
      // If the timer has ended reset it and start the stop timer
      if (pomodoroTimer === 0) {
        setPomodoroTimer(pomodoro);

        // Adding the amounts it has ran
        setTimesRun((time) => time + 1);

        // If the stop timer is active enable it
        if (stopActive) {
          setRunStop(true);
        }

        // Stop the timer
        setRunPomodoro(false);
      } else {
        // Main timer logic
        setTimeout(() => {
          setPomodoroTimer((time) => time - 1);
        }, 1);
      }
    } else {
      // Reset the timer
      setPomodoroTimer(pomodoro);
    }
  }, [pomodoroTimer, runPomodoro, runStop]);

  // Use effect for the stop timer
  useEffect(() => {
    // Checking if the stop timer should run and is active
    if (runStop && stopActive) {
      // If the timer has ended, reset it and start the pomodoro
      if (stopTimer === 0) {
        setStopTimer(stop);
        setRunPomodoro(true);

        // Stop the timer
        setRunStop(false);
      } else {
        // Main timer logic
        setTimeout(() => {
          setStopTimer((time) => time - 1);
        }, 1);
      }
    }
  }, [runStop, stopTimer, runPomodoro]);

  return (
    <div className="App">
      <label htmlFor="useBreak">
        <input
          type="checkbox"
          name="useBreak"
          id="useBreak"
          onChange={() => setStopActive((active) => !active)}
        />
        Do you want to use a break timer?
      </label>
      <p>Times pomodoro ran: {timesRun}</p>
      <Clock time={pomodoroTimer} title={'Pomodoro Time Left'} />
      {stopActive ? <Clock time={stopTimer} title={'Break Time Left'} /> : <></>}
      <button onClick={() => setRunPomodoro(true)}>Start</button>
    </div>
  );
}

export default App;
