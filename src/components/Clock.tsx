import { Fragment } from 'react';

interface ClockProps {
  time: number;
  title: string;
  class?: string;
}

export default function Clock(props: ClockProps) {
  const min = Math.floor(props.time / 60);
  const sec = props.time - min * 60;

  return (
    <Fragment>
      <h1>{props.title}</h1>
      <span className={props.class}>
        {min}:{sec < 10 ? '0' + sec.toString() : sec}
      </span>
    </Fragment>
  );
}
