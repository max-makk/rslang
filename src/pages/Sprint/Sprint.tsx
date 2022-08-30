import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import style from './Sprint.module.css'
import { initWordsLevel, setGroup, setPage } from '../../state/reducers/sprint'
import { Game } from './Game/Game';
import { getRandomGroupNumber, getRandomPageNumber } from '../../utils/utils';
import { StartButtons } from './StartButons/StartButtons';

export const Sprint = () => {

  const dispatch = useAppDispatch()

  const { useTextbook } = useAppSelector(state => state.sprint)
  const { group, page, words, isGameStarted } = useAppSelector(state => state.sprint)
  
  const user = useAppSelector(state => state.user)
  useEffect(() => {
    if(user) {
      if(useTextbook) {

      } else {

      }
    } else {
      if(useTextbook) {

      } else {
        dispatch(initWordsLevel(group, String(getRandomPageNumber())))
        // const deck = createDeck(words)
        // dispatch(initRandomAnwers(String(getRandomGroupNumber()), String(getRandomPageNumber())))
      }
    }
  }, [])

  return <div className={style.wrapper}>
    <StartButtons />
    {isGameStarted && <Game />}
  </div>
}