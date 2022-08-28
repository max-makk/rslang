import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import style from './Sprint.module.css'
import { setLevel } from '../../state/reducers/sprint'
import { Game } from './Game/Game';

export const Sprint = () => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useAppDispatch()

  const { useTextbook } = useAppSelector(state => state.sprint)

  const startLevel = (lvl: string) => {
    dispatch(setLevel(lvl))
    setIsOpen(true)
  }

  useEffect(() => {
    const user = useAppSelector(state => state.user)

    if(user) {
      if(useTextbook) {

      }
    } else {
      if(useTextbook) {

      }
    }
  })

  return <div className={style.wrapper}>
    {useTextbook && <button className={`${style.start} ${style.gradientBox}`}>Начать игру</button>}
    {!useTextbook && <h2 className={style.title}>Выбери уровень</h2>}
    {!useTextbook && <div className={style.buttons}>
      <button onClick={() => startLevel('1')} className={`${style.btn} ${style.lvl1}`}>1</button>
      <button onClick={() => startLevel('2')} className={`${style.btn} ${style.lvl2}`}>2</button>
      <button onClick={() => startLevel('3')} className={`${style.btn} ${style.lvl3}`}>3</button>
      <button onClick={() => startLevel('4')} className={`${style.btn} ${style.lvl4}`}>4</button>
      <button onClick={() => startLevel('5')} className={`${style.btn} ${style.lvl5}`}>5</button>
      <button onClick={() => startLevel('6')} className={`${style.btn} ${style.lvl6}`}>6</button>
    </div>}
    {isOpen && <Game setIsOpen={setIsOpen} />}
  </div>
}