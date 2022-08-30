import style from './AudioGame.module.css';

export const AudioGame = () => {
  return (
    <div className={style.audiogame_wrapper}>
      Выберите уровень:
      <div className={style.audiogame_level_wrapper}>
        <button className={style.audiogame_level}>1</button>
        <button className={style.audiogame_level}>2</button>
        <button className={style.audiogame_level}>3</button>
        <button className={style.audiogame_level}>4</button>
        <button className={style.audiogame_level}>5</button>
        <button className={style.audiogame_level}>6</button>
      </div>
      <div className={style.audiogame_gamewindow}>
       <div className={style.audiogame_gamewindow_main_wrapper}> <div className={style.audiogame_gamewindow_main}>знак ноты и замена на карточку</div> </div>
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
