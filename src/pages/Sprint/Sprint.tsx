import { useState } from 'react'
import style from './Sprint.module.css'

type GameModal  = {
  setIsOpen: (value: boolean) => void;
}; 

const Game = ({ setIsOpen }: GameModal) => {
  return (
    <div className={style.modal}>
      <div  onClick={() => setIsOpen(false)}>game</div>
    </div>
  )
}

export const Sprint = () => {
  const [isOpen, setIsOpen] = useState(false)

  const showGame = () => {

  }

  return <div>
  <div className={style.buttons}>
    <button onClick={() => setIsOpen(true)} className={`${style.btn} ${style.lvl1}`}>1</button>
    <button className={`${style.btn} ${style.lvl2}`}>2</button>
    <button className={`${style.btn} ${style.lvl3}`}>3</button>
    <button className={`${style.btn} ${style.lvl4}`}>4</button>
    <button className={`${style.btn} ${style.lvl5}`}>5</button>
    <button className={`${style.btn} ${style.lvl6}`}>6</button>
  </div>
  {isOpen && <Game setIsOpen={setIsOpen} />}
  </div>
}