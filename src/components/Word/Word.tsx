import style from './Word.module.css';
import { IWord } from "../../types/types";
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { useState } from 'react';
import { Button } from "../Button/Button";

export const Word = (word: IWord) => {
  const [color] = useState(`var(--level${word.group + 1})`);
  const [backgroundColor] = useState(`var(--level${word.group + 1})`);
  const [colorLearned, setColorLearned] = useState(false);
  const [colorDifficult, setColorDifficult] = useState(false);
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
  const handleLearnedWords = () => {
    setColorLearned(current => !current);

  }

  const handleDifficultWords = () => {
    setColorDifficult(current => !current);
  }

  return (
      <div className={style.word}>
        <div>
          <img className={style.image} src={`${baseUrl}/${word.image}`} alt={'image'}/>
        </div>
        <div className={style.info}>
          <div className={style.headings}>
            <span style={{backgroundColor}} className={style.heading}>{word.word}</span>
            <span className={style.heading}>{word.transcription}</span>
            <button className={style.audio_button} onClick={() => playAudio()}>
              <MusicNoteRoundedIcon style={{color}} className={style.audio}/>
            </button>
          </div>
          <div style={{color}} className={style.translate_word}>{word.wordTranslate}</div>
          <div className={style.translate_sentences}>
            <div className={style.example} dangerouslySetInnerHTML={{__html: word.textMeaning}}/>
            <div className={style.translate_example}>{word.textMeaningTranslate}</div>
          </div>
          <div className={style.translate_sentences}>
            <div className={style.example} dangerouslySetInnerHTML={{__html: word.textExample}}/>
            <div className={style.translate_example}>{word.textExampleTranslate}</div>
          </div>
        </div>
        <div className={style.buttons}>
          <Button style={{
            backgroundColor: colorLearned ? `var(--learned)` : '',
          }} className={style.learned} onClick={() => handleLearnedWords()}>Изученное</Button>
          <Button style={{
            backgroundColor: colorDifficult ? `var(--hard)` : '',
          }} className={style.difficult} onClick={() => handleDifficultWords()}>Сложное</Button>
        </div>
      </div>
  )
}
