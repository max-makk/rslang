import { useAppDispatch, useAppSelector } from '../../../state/hooks'
import style from './StartButtons.module.css'
import { setGame, setUserGame, startGame } from '../../../state/reducers/sprint'

export const StartButtons = () => {

  const dispatch = useAppDispatch()
  const { useTextbook } = useAppSelector(state => state.sprint)
  const user = useAppSelector(state => state.user)

  const handleLevelClick = (lvl: string) => {
    if(user) {
      dispatch(setUserGame(String(Number(lvl) - 1)))
    } else {
      dispatch(setGame(String(Number(lvl) - 1)))
    }
  }

  const handleGameClick = () => {
    setTimeout(() => {
      dispatch(startGame(true))
    }, 3000)
  }

  return (
    <>
    {useTextbook && <button onClick={() => handleGameClick()} className={`${style.start} ${style.gradientBox}`}>Начать игру</button>}
    {!useTextbook && <h2 className={style.title}>Выбери уровень</h2>}
    {!useTextbook && <div className={style.buttons}>
      <button onClick={() => handleLevelClick('1')} className={`${style.btn} ${style.lvl1}`}>1</button>
      <button onClick={() => handleLevelClick('2')} className={`${style.btn} ${style.lvl2}`}>2</button>
      <button onClick={() => handleLevelClick('3')} className={`${style.btn} ${style.lvl3}`}>3</button>
      <button onClick={() => handleLevelClick('4')} className={`${style.btn} ${style.lvl4}`}>4</button>
      <button onClick={() => handleLevelClick('5')} className={`${style.btn} ${style.lvl5}`}>5</button>
      <button onClick={() => handleLevelClick('6')} className={`${style.btn} ${style.lvl6}`}>6</button>
    </div>}
    </>
  )
}