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

  useEffect(() => {
    if (runPomodoro) {
      if (pomodoroTimer === 0) {
        setPomodoroTimer(pomodoro);
        setTimesRun((time) => time + 1);
        if (stopActive) {
          setRunStop(true);
        }
        setRunPomodoro(false);
      }
      setTimeout(() => {
        setPomodoroTimer((time) => time - 1);
      }, 1);
    } else {
      setPomodoroTimer(pomodoro);
    }
  }, [pomodoroTimer, runPomodoro, stopActive]);

  useEffect(() => {
    if (runStop && stopActive) {
      if (stopTimer === 0) {
        setRunPomodoro(true);
        setStopTimer(stop);
        setRunStop(false);
      } else {
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
