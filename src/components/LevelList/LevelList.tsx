import style from './LevelList.module.css'
import { setGroup } from '../../state/reducers/textbook';
import { useAppDispatch } from '../../state/hooks';

export const LevelList = () => {
  const dispatch = useAppDispatch();
  return (
      <ul className={style.level_list}>
        <li className={style.level_item} onClick={() => dispatch(setGroup('0'))}>
          Уровень 1
        </li>
        <li className={style.level_item} onClick={() => dispatch(setGroup('1'))}>
          Уровень 2
        </li>
        <li className={style.level_item} onClick={() => dispatch(setGroup('2'))}>
          Уровень 3
        </li>
        <li className={style.level_item} onClick={() => dispatch(setGroup('3'))}>
          Уровень 4
        </li>
        <li className={style.level_item} onClick={() => dispatch(setGroup('4'))}>
          Уровень 5
        </li>
        <li className={style.level_item} onClick={() => dispatch(setGroup('5'))}>
          Уровень 6
        </li>
      </ul>
  )
}
