import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import style from './Game.module.css'
import { initWordsLevel, setGroup, setPage, increaseIdx } from '../../../state/reducers/sprint'
import { Timer } from '../Timer/Timer';


interface Deck {
  id: string,
  word: string,
  wordTranslate: string
  result: boolean
}

export const Game = () => {
  const dispatch = useAppDispatch()
  const [resultStyle, setResultStyle] = useState<null | string>(null)
  const { group, page, words, deck, idx } = useAppSelector(state => state.sprint)
  const { useTextbook } = useAppSelector(state => state.sprint)
  const [current, setCurrent] = useState<Deck>(deck[idx])
  const handleAnswer = (answer: boolean) => {
    if(answer === current.result) {
      console.log('yгадаl')
    } else {
      console.log('ошбся')
    }
    dispatch(increaseIdx(null))
  }

  useEffect(() => {
    setCurrent(deck[idx])
  },[idx])


  return (
    <div className={style.modal}>
      <div className={style.header}>
        <div className={style.score}>23</div>
        <div className={style.timer}><Timer /></div>
      </div>
      <div className={style.card}>
        <div className={style.circles}>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
          <div className={style.circle}></div>
        </div>
        <div className={style.word}>{current.word}</div>
        <div className={style.answer}>{current.wordTranslate}</div>
        <div className={style.buttons}>
          <button onClick={() => handleAnswer(true)} className={style.buttonTrue}>Верно</button>
          <button onClick={() => handleAnswer(false)} className={style.buttonFalse}>Неверно</button>
        </div>
      </div>
    </div>
  )
}

const Card = () => {

}