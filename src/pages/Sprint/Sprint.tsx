import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import style from './Sprint.module.css'
import { setTextbookGame, setUserTextbookGame } from '../../state/reducers/sprint'
import { Game } from './Game/Game';
import { StartButtons } from './StartButons/StartButtons';
import { ResultsModal } from './ResultsModal/ResultsModal';

export const Sprint = () => {

  const dispatch = useAppDispatch()

  const { useTextbook, showResults } = useAppSelector(state => state.sprint)
  const { isGameStarted } = useAppSelector(state => state.sprint)
  
  const user = useAppSelector(state => state.user)
  useEffect(() => {
    if(user) {
      if(useTextbook) {
        dispatch(setUserTextbookGame())
      }
    } else {
      if(useTextbook) {
        dispatch(setTextbookGame())
      }
    }
  }, [])

  return <div className={style.wrapper}>
    {showResults ? <ResultsModal /> : < StartButtons />}
    {isGameStarted && <Game />}
  </div>
}