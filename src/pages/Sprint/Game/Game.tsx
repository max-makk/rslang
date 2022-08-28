import style from './Game.module.css'

type GameModal  = {
  setIsOpen: (value: boolean) => void;
}; 

export const Game = ({ setIsOpen }: GameModal) => {
  return (
    <div className={style.modal}>
      <div  onClick={() => setIsOpen(false)}>game</div>
    </div>
  )
}