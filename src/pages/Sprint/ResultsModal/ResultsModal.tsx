import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { displayResults } from "../../../state/reducers/sprint";
import { IWord } from "../../../types/types";
import style from "./ResultsModal.module.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

export const ResultsModal = () => {
  const { results } = useAppSelector((state) => state.sprint);
  const baseUrl = "http://localhost:3001";

  const dispatch = useAppDispatch()

  const playSound = (path: string) => {
    const audio = new Audio(`${baseUrl}/${path}`);
    audio.play();
  };

  const closeResult = () => {
    dispatch(displayResults(false))
  }

  return (
    <div className={style.modal}>
      <div className={style.close} onClick={() => closeResult()}>
        <CloseIcon />
      </div>
      <div className={style.wrapper}>
        <div className={style.group}>
          <h2 className={style.title}>
            знаю{" "}
            <span className={`${style.result} ${style.green}`}>
              {results[0].length}
            </span>
          </h2>
          <ul className={style.list}>
            {results[0] &&
              results[0].map((el: IWord) => {
                return (
                  <li key={el.id || el._id} className={style.item}>
                    <div onClick={() => playSound(el.audio)}>
                      <PlayCircleOutlineIcon />
                    </div>
                    <span>{el.word}</span> - <span>{el.wordTranslate}</span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={style.hr}></div>
        <div className={style.group}>
          <h2 className={style.title}>
            ошибся{" "}
            <span className={`${style.result} ${style.red}`}>
              {results[1].length}
            </span>
          </h2>
          <ul className={style.list}>
            {results[1] &&
              results[1].map((el: IWord) => {
                return (
                  <li key={el.id || el._id} className={style.item}>
                    <div onClick={() => playSound(el.audio)}>
                      <PlayCircleOutlineIcon />
                    </div>
                    <span>{el.word}</span> - <span>{el.wordTranslate}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
