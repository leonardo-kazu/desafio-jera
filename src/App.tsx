import { useEffect, useState } from 'react';
import Clock from './components/Clock';

import './styles/App.css';

function App() {
  const [timesRun, setTimesRun] = useState<number>(0);

  const [pomodoro, setPomodoro] = useState<number>(60 * 2);
  const [stop, setStop] = useState(60 * 5);

  const [timer, setTimer] = useState<number>(pomodoro);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [stopActive, setStopActive] = useState<boolean>(false);
  const [shouldBePomodoro, setShouldBePomodoro] = useState<boolean>(true);

  // const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    if (!Notification) {
      alert('Desktop notifications not available!');
    }
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (timesRun % 4 === 0 && timesRun !== 0) {
      // setShowAlert(true);
      if (Notification.permission === 'granted') {
        new Notification('Take a break', {
          body: 'Hey, you have alredy done 4 pomodoro timers in a row, what about a 10 minute break?',
        });
      }
    }
  }, [timesRun]);

  useEffect(() => {
    // Since changing state is async and we work with changing the state for conditions
    // we check to see if it should be a pomodoro or a stop timer
    let isPomodoro = shouldBePomodoro;
    // Check if should start the timer
    if (isRunning) {
      // If the timer is zero run the logic for changing or keep on counting down
      if (timer === 0) {
        new Audio('./notificationSound.wav').play();

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
        }, 1000);
      }
    }
  }, [timer, isRunning, stopActive]);

  return (
    <div className="App">
      <div className="container left">
        {/* Break timer time selections */}
        <div className="select">
          <button
            className="selectors"
            onClick={() => {
              if (stop < 60 * 60) setStop((time) => time + 60 * 1);
            }}>
            <i className="bi bi-arrow-up-circle"></i>
          </button>
          <Clock time={stop} title={'Break Time'} />
          <button
            className="selectors"
            onClick={() => {
              if (stop > 60) setStop((time) => time - 60 * 1);
            }}>
            <i className="bi bi-arrow-down-circle"></i>
          </button>
        </div>
        {/* Pomodoro timer time selections */}
        <div className="select">
          <button
            onClick={() => {
              if (pomodoro < 60 * 60) setStop((time) => time + 60 * 1);
            }}>
            <i className="bi bi-arrow-up-circle"></i>
          </button>
          <Clock time={pomodoro} title={'Pomodoro Time'} />
          <button
            onClick={() => {
              if (pomodoro > 60) setStop((time) => time - 60 * 1);
            }}>
            <i className="bi bi-arrow-down-circle"></i>
          </button>
        </div>
      </div>
      <div className="container right">
        <Clock time={timer} title={shouldBePomodoro ? 'Pomodoro Time Left' : 'Break Time Left'} />
        {/* Play/Pause/UseBreak options */}
        <div className="options">
          <button onClick={() => setIsRunning(true)}>
            <i className="bi bi-play-circle"></i>
          </button>
          <button onClick={() => setIsRunning(false)}>
            <i className="bi bi-pause-circle"></i>
          </button>
          <label htmlFor="useStop">
            <input
              type="checkbox"
              id="useStop"
              onChange={() => setStopActive((active) => !active)}
            />
            Use break
          </label>
        </div>
        <p className="runs">Times pomodoro ran: {timesRun}</p>
      </div>
      {/* {showAlert ? (
        <div>
          <h1>You already completed 4 pomodoro timers, what about a 10 min break?</h1>
          <button onClick={() => setShowAlert(false)}>Dismiss</button>
        </div>
      ) : (
        <></>
      )} */}
    </div>
  );
}

export default App;
