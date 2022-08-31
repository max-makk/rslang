import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useAppDispatch } from "../../../state/hooks";
import { startGame } from "../../../state/reducers/sprint";

export const Timer = () => {
  const dispatch = useAppDispatch()
  return (
   <CountdownCircleTimer
    isPlaying
    duration={60}
    size={80}
    strokeWidth={5}
    colors='#FFA500'
    onComplete={() => {
      dispatch(startGame(false))
      return { shouldRepeat: false, delay: 1 }
    }}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
  );
}
