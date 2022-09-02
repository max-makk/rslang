import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { displayResults, startGame, setResults } from "../../../state/reducers/sprint";
import { createResults } from "../utils";

export const Timer = () => {
  const dispatch = useAppDispatch()
  const {words, guessed, unguessed} = useAppSelector(state => state.sprint)
  const user = useAppSelector(state => state.user)

  const stopGame = () => {
    dispatch(startGame(false))
    const arr = createResults(words, guessed, unguessed)
    dispatch(setResults(arr))
    dispatch(displayResults(true))
    if(user) {
    }
  }

  return (
   <CountdownCircleTimer
    isPlaying
    duration={60}
    size={80}
    strokeWidth={5}
    colors='#FFA500'
    onComplete={() => {
      stopGame()
      return { shouldRepeat: false, delay: 1 }
    }}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
  );
}
