import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import style from './Game.module.css'
import { setGroup, setPage, increaseIdx, addGuessed, addUnGuessed, startGame, setResults } from '../../../state/reducers/sprint'
import { Timer } from '../Timer/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Deck {
  id: string,
  word: string,
  wordTranslate: string
  result: boolean
}

export const Game = () => {
  const dispatch = useAppDispatch()
  const [green, setGreen] = useState(false)
  const [red, setRed] = useState(false)
  const user = useAppSelector(state => state.user)
  const { group, page, words, deck, idx, guessed } = useAppSelector(state => state.sprint)
  const [current, setCurrent] = useState<Deck>(deck[idx])
  const handleAnswer = (answer: boolean) => {
    if(answer === current.result) {
      dispatch(addGuessed(current.id))
      setGreen(true)
      setTimeout(() => {
        setGreen(false)
      }, 200);
    } else {
      dispatch(addUnGuessed(current.id))
      setRed(true)
      setTimeout(() => {
        setRed(false)
      }, 200);
    }
    if(idx + 1 === deck.length) {
      dispatch(startGame(false))
      // dispatch(setResults(true))
    }
    dispatch(increaseIdx(null))
  }

  useEffect(() => {
    setCurrent(deck[idx])
  },[idx])

  return (
    <div className={style.modal}>
      <div className={style.header}>
        <div className={style.score}>100</div>
        <div className={style.timer}><Timer /></div>
      </div>
      <div className={`${style.card} ${green ? style.green : ''} ${red ? style.red : ''}`}>
        <div className={style.circles}>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
        </div>
        <div className={style.word}>{current.word}</div>
        <div className={style.answer}>{current.wordTranslate}</div>
        <div
         className={`${style.checkWrapper}`}>
          <div className={`${green ? style.displayCheck : red ? style.displayCheck : style.hideCheck}`} >
            <CheckCircleIcon style={{color: `${green ? 'green' : 'red'}`}} />
          </div>
        </div>
        <div className={style.buttons}>
          <button onClick={() => handleAnswer(true)} className={style.buttonTrue}>Верно</button>
          <button onClick={() => handleAnswer(false)} className={style.buttonFalse}>Неверно</button>
        </div>
      </div>
    </div>
  )
}