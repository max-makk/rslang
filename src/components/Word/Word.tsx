import style from './Word.module.css';
import { IWord } from "../../types/types";
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';

export const Word = (word: IWord) => {
  const baseUrl = 'http://localhost:3001'

  const playAudio = () => {
    const audioWord = new Audio(`${baseUrl}/${word.audio}`)
    const audioMeaning = new Audio(`${baseUrl}/${word.audioMeaning}`)
    const audioExample = new Audio(`${baseUrl}/${word.audioExample}`)
    const audios: HTMLAudioElement[] = [audioWord, audioMeaning, audioExample]
    for (let i = 0; i < audios.length; i++) {
      audios[0].play().then();
      if (i > 0) {
        audios[i - 1].onended = () => {
          audios[i].play();
        }
      }
    }
  }

  return (
      <div className={style.word}>
        <div>
          <img className={style.image} src={`${baseUrl}/${word.image}`} alt={'image'}/>
        </div>
        <div className={style.info}>
          <div className={style.headings}>
            <span className={style.heading}>{word.word}</span>
            <span className={style.heading}>{word.transcription}</span>
            <button className={style.audio_button} onClick={() => playAudio()}>
              <MusicNoteRoundedIcon className={style.audio}/>
            </button>
          </div>
          <div className={style.translate_word}>{word.wordTranslate}</div>
          <div className={style.example} dangerouslySetInnerHTML={{__html: word.textMeaning}}/>
          <div className={style.translate_example}>{word.textMeaningTranslate}</div>
          <div className={style.example} dangerouslySetInnerHTML={{__html: word.textExample}}/>
          <div className={style.translate_example}>{word.textExampleTranslate}</div>
        </div>
      </div>
  )
}
