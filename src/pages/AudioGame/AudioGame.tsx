import { useAppDispatch } from '../../state/hooks';
import { setGroup } from '../../state/reducers/textbook';
import style from './AudioGame.module.css';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { IWord } from "../../types/types";

export const AudioGame = () => {
  const dispatch = useAppDispatch();

  const baseUrl = 'http://localhost:3001'
 
  /* const playAudio = () => {
    const audioWord = new Audio(`${baseUrl}/${word.audio}`)
  } */
  return (
    <div className={style.audiogame_wrapper}>
      Выберите уровень:
      <div className={style.audiogame_level_wrapper}>
        <button className={style.audiogame_level} onClick={() => dispatch(setGroup('0'))}>1</button>
        <button className={style.audiogame_level} onClick={() => dispatch(setGroup('1'))}>2</button>
        <button className={style.audiogame_level} onClick={() => dispatch(setGroup('2'))}>3</button>
        <button className={style.audiogame_level} onClick={() => dispatch(setGroup('3'))}>4</button>
        <button className={style.audiogame_level} onClick={() => dispatch(setGroup('4'))}>5</button>
        <button className={style.audiogame_level} onClick={() => dispatch(setGroup('5'))}>6</button>
      </div>
      <div className={style.audiogame_gamewindow}>
       <div className={style.audiogame_gamewindow_main_wrapper}> <div className={style.audiogame_gamewindow_main}> 
       <button className={style.audiogame_gamewindow_sound} >
        <MusicNoteRoundedIcon className={style.audio}/>
        </button> знак ноты и замена на карточку</div> </div>
        <div className={style.audiogame_gamewindow_words_string}>
          <div className={style.audiogame_gamewindow_word}>word_1</div>
          <div className={style.audiogame_gamewindow_word}>word_2</div>
          <div className={style.audiogame_gamewindow_word}>word_3</div>
          <div className={style.audiogame_gamewindow_word}>word_4</div>
          <div className={style.audiogame_gamewindow_word}>word_5</div>
        </div>
        <button className={style.audiogame_gamewindow_next_btn}>не знаю</button>
      </div>
    </div>
  );
};
