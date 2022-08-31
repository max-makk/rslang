import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import style from './Sprint.module.css'
import { setGroup, setPage } from '../../state/reducers/sprint'
import { Game } from './Game/Game';
import { getRandomGroupNumber, getRandomPageNumber } from '../../utils/utils';
import { StartButtons } from './StartButons/StartButtons';
import wordsService from '../../services/words'
import { getExtraWords } from './utils';

export const Sprint = () => {

  const dispatch = useAppDispatch()

  const { useTextbook } = useAppSelector(state => state.sprint)
  const { group, page, words, isGameStarted } = useAppSelector(state => state.sprint)
  
  const user = useAppSelector(state => state.user)
  useEffect(() => {
    if(user) {
      if(useTextbook) {

      }
    } else {
      if(useTextbook) {

      }
    }
  }, [])

  return <div className={style.wrapper}>
    <StartButtons />
    {isGameStarted && <Game />}
  </div>
}