import { IWord } from '../../types/types';
import style from './Statistic.module.css';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import CloseIcon from '@mui/icons-material/Close';

const baseUrl = 'https://learnwords-backend.herokuapp.com';
const playAudio = (audioPath: string) => {
  if (audioPath) {
    const audioTrack = new Audio(`${baseUrl}/${audioPath}`);
    audioTrack.play();
  }
};
export interface StatisticProps {
  learnedWords: IWord[];
  unlearnedWords: IWord[];
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Statistic = ({
  learnedWords,
  unlearnedWords,
  onClose,
}: StatisticProps) => (
  <div className={style.statistic}>
    <button className={style.close_btn} onClick={onClose}>
      <CloseIcon />
    </button>
    <h2 className={style.false}>Не изученные слова:</h2>
    <ul className={style.statistics_words}>
      {unlearnedWords.map((word) => (
        <li key={word.id}>
          <button
            type="button"
            onClick={(e) => playAudio(word.audio)}
            className={style.audio_btn}
          >
            <MusicNoteRoundedIcon className={style.audio} />
          </button>
          {word.word} - {word.wordTranslate}
        </li>
      ))}
    </ul>
    <h2 className={style.true}>Изученные слова:</h2>
    <ul className={style.statistics_words}>
      {learnedWords.map((word) => (
        <li key={word.id}>
          <button
            type="button"
            onClick={() => playAudio(word.audio)}
            className={style.audio_btn}
          >
            {' '}
            <MusicNoteRoundedIcon className={style.audio} />{' '}
          </button>
          {word.word} - {word.wordTranslate}
        </li>
      ))}
    </ul>
    {/* <button
              className={style.nextlevel_btn}onClick={}> Играть еще
            </button> */}
  </div>
);
