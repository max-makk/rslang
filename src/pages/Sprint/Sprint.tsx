import style from './Sprint.module.css'

export const Sprint = () => {
  return <div className={style.buttons}>
    <button className={`${style.btn} ${style.lvl1}`}>1</button>
    <button className={`${style.btn} ${style.lvl2}`}>2</button>
    <button className={`${style.btn} ${style.lvl3}`}>3</button>
    <button className={`${style.btn} ${style.lvl4}`}>4</button>
    <button className={`${style.btn} ${style.lvl5}`}>5</button>
    <button className={`${style.btn} ${style.lvl6}`}>6</button>
  </div>
}