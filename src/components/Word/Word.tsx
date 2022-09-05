import style from './Word.module.css';
import { IWord } from "../../types/types";
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector} from '../../state/hooks';
import {
  deleteHardWord, deleteLearnedWord, initializeAggregatedWords,
  initializeHardWords, initializeLearnedWords,
  setHardWord, setLearnedWord,
} from '../../state/reducers/textbook';

export const Word = (word: IWord) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const [color] = useState(`var(--level${word.group + 1})`);
  const [backgroundColor] = useState(`var(--level${word.group + 1})`);
  const [colorLearned, setColorLearned] = useState(false);
  const [colorDifficult, setColorDifficult] = useState(false);
  const baseUrl = 'http://localhost:3001'
  const { learned, difficult }: { learned: IWord[], difficult: IWord[] } = useAppSelector(state => state.textbook)
  const group = useAppSelector(state => state.textbook.group)
  const page = useAppSelector(state => state.textbook.page);

  useEffect(() => {
    dispatch(initializeHardWords())
    dispatch(initializeLearnedWords())
    setColor()
  }, [])

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
  const handleLearnedWords = (id: string) => {
    setColorDifficult(false)
    setColorLearned(current => !current);
    const obj = {
      // difficulty: '',
      optional: {learned: true}
    }

    if (difficult.find(el => el.id === id || el._id === id)) {
      setColorDifficult(false)
      dispatch(deleteHardWord(id))
    }
    if (learned.find(el => el.id === id || el._id === id)) {
      dispatch(deleteLearnedWord(id))
    } else {
      dispatch(setLearnedWord(id, obj))
    }
    dispatch(initializeAggregatedWords(group, page))
  }

  const handleDifficultWords = (id: string) => {
    setColorLearned(false)
    setColorDifficult(current => !current);
    const obj = {
      difficulty: 'hard',
      // optional: {}
    }
    if (learned.find(el => el.id === id || el._id === id)) {
      dispatch(deleteLearnedWord(id))
    }
    if (difficult.find(el => el.id === id || el._id === id)) {
      dispatch(deleteHardWord(id))
    } else {
      dispatch(setHardWord(id, obj))
    }
    dispatch(initializeAggregatedWords(group, page))
  }

  const setColor = () => {
    if (word.userWord?.difficulty) {
      return word.userWord.difficulty === 'hard' ? setColorDifficult(true) : setColorDifficult(false)
    }
    if (word.userWord?.optional) {
      return word.userWord.optional.learned ? setColorLearned(true) : setColorLearned(false)
    }
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
          {user && <Button style={{
            backgroundColor: colorLearned ? `var(--learned)` : ''
          }} className={style.learned} onClick={() => handleLearnedWords(word.id)}>Изученное</Button>}
          {user && <Button style={{
            backgroundColor: colorDifficult ? `var(--hard)` : ''
          }} className={style.difficult} onClick={() => handleDifficultWords(word.id)}>Сложное</Button>}
        </div>
      </div>
  )
}
