import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const Timer = () => {
  return (
   <CountdownCircleTimer
    isPlaying
    duration={4}
    size={80}
    strokeWidth={5}
    colors='#FFA500'
    onComplete={() => {
      console.log('end')
      return { shouldRepeat: false, delay: 1 }
    }}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
  );
}
