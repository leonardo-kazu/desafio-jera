import { useEffect, useState } from 'react';
import Clock from './components/Clock';

function App() {
  const [pomodoroTime, setPomodoroTime] = useState<number>(60 * 25);
  const [runPomodoro, setRunPomodoro] = useState<boolean>(false);

  useEffect(() => {
    if (runPomodoro) {
      setTimeout(() => {
        setPomodoroTime((time) => time - 1);
      }, 1000);
    }
  }, [pomodoroTime]);

  return (
    <div className="App">
      <Clock time={pomodoroTime} title={'Pomodoro Time Left'} />
    </div>
  );
}

export default App;
