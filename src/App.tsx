import { useEffect, useState } from 'react';
import Clock from './components/Clock';

function App() {
  const [timesRun, setTimesRun] = useState<number>(0);

  const [pomodoro, setPomodoro] = useState<number>(60 * 10);
  const [stop, setStop] = useState(60 * 5);

  const [timer, setTimer] = useState<number>(pomodoro);
  const [runPomodoro, setRunPomodoro] = useState<boolean>(false);
  const [stopActive, setStopActive] = useState<boolean>(false);
  const [shouldBePomodoro, setShouldBePomodoro] = useState<boolean>(true);

  useEffect(() => {
    // Since changing state is async and we work with changing the state for conditions
    // we check to see if it should be a pomodoro or a stop timer
    let isPomodoro = shouldBePomodoro;
    // Check if should start the timer
    if (runPomodoro) {
      // If the timer is zero run the logic for changing or keep on counting down
      if (timer === 0) {
        // Check if is running the pomodoro clock then sum the times ran
        if (isPomodoro) {
          setTimesRun((ran) => ran + 1);
          // If we should ran the stop timer set pomodoro to false or set back to pomodoro
          if (stopActive) isPomodoro = false;
        } else {
          isPomodoro = true;
        }
        setShouldBePomodoro(isPomodoro);

        // Check if we need to start the stop timer or reset pomodoro
        if (stopActive && !isPomodoro) {
          setTimer(stop);
        } else {
          setTimer(pomodoro);
        }
      } else {
        setTimeout(() => {
          setTimer((time) => time - 1);
        }, 1);
      }
    }
  }, [timer, runPomodoro, stopActive]);

  return (
    <div className="App">
      <label htmlFor="useStop">
        <input type="checkbox" id="useStop" onChange={() => setStopActive((active) => !active)} />
        Do you want to use a break timer?
      </label>
      <p>Times pomodoro ran: {timesRun}</p>
      <Clock time={timer} title={shouldBePomodoro ? 'Pomodoro Time Left' : 'Break Time Left'} />
      <button onClick={() => setRunPomodoro(true)}>Start</button>
    </div>
  );
}

export default App;
