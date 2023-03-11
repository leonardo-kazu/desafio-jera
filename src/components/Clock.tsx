import { Fragment } from 'react';

import '../styles/Clock.css';
interface ClockProps {
  time: number;
  title: string;
}

export default function Clock(props: ClockProps) {
  const min = Math.floor(props.time / 60);
  const sec = props.time - min * 60;

  return (
    <div className="clock">
      <h1 className="title">{props.title}</h1>
      <span className="timer">
        {min < 10 ? '0' + min.toString() : min}:{sec < 10 ? '0' + sec.toString() : sec}
      </span>
    </div>
  );
}
