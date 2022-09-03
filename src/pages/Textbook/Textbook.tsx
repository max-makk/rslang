import style from './Textbook.module.css'
import { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  initializeAggregatedWords,
  initializeHardWords,
  initializeWords,
  setPage
} from '../../state/reducers/textbook';
import { IWord } from '../../types/types';
import { Word } from '../../components/Word/Word';
import { LevelList } from '../../components/LevelList/LevelList';
import { setTextbook } from '../../state/reducers/sprint';
import { Link } from 'react-router-dom';

export const Textbook = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const group = useAppSelector(state => state.textbook.group)
  const page = useAppSelector(state => state.textbook.page);
  const {words, difficult}: { words: IWord[], difficult: IWord[] } = useAppSelector(state => state.textbook)
  const [modal, setModal] = useState(false);
  const [isRightDisabled, setRightDisabled] = useState(false);
  const [isLeftDisabled, setLeftDisabled] = useState(false);
  const pageNumber = parseInt(page);

  useEffect(() => {
    if (user) {
      dispatch(initializeAggregatedWords(group, page))
      dispatch(initializeHardWords())
    } else {
      dispatch(initializeWords(group, page))
      setModal(false)
    }
  }, [group, page])

  const HandleRightClick = () => {
    if (pageNumber === 29) {
      setRightDisabled(true)
    } else {
      if (pageNumber === 0 && isLeftDisabled) {
        setLeftDisabled(false)
      }
      const nextPage = pageNumber + 1;
      dispatch(setPage(nextPage))
    }
  }
  const HandleLeftClick = () => {
    if (pageNumber === 0) {
      setLeftDisabled(true)
    } else {
      if (pageNumber === 29 && isRightDisabled) {
        setRightDisabled(false)
      }
      const prevPage = pageNumber - 1;
      dispatch(setPage(prevPage))
    }
  }


  const handleSprint = () => {
    dispatch(setTextbook(true))
  }

  return (
      <div className={style.textbook}>
        <h1 className={style.textbook_header}>Учебник</h1>
        <div className={style.textbook_buttons}>
          <div className={style.textbook_choose}>
            <button className={`${style.textbook_button} ${style.textbook_level}`}
                    onClick={() => setModal(true)}
            >
              Уровень {+group + 1}
            </button>
            {modal && <Modal open={modal} onClose={() => setModal(false)}>
              <LevelList/>
            </Modal>}
          </div>
          <div className={style.textbook_pages}>
            <button className={`${style.textbook_button} ${style.textbook_arrow_left}`}
                    onClick={HandleLeftClick}
                    disabled={isLeftDisabled}>&lt;</button>

            <button className={`${style.textbook_button} ${style.textbook_page}`}>Страница {pageNumber + 1}</button>
            <button className={`${style.textbook_button} ${style.textbook_arrow_right}`}
                    onClick={HandleRightClick}
                    disabled={isRightDisabled}>&gt;</button>
          </div>
          <button className={`${style.textbook_button} ${style.textbook_call}`}>Аудиовызов</button>
          <Link to='/sprint'>
          <button onClick={() => handleSprint()} className={`${style.textbook_button} ${style.textbook_sprint}`}>Спринт</button>
</Link>
          <button className={`${style.textbook_button} ${style.textbook_hard_words}`}>Сложные слова</button>
        </div>
        <div className={style.words}>
          {words.map((word) =>
              <Word key={word.id} id={word.id} group={word.group} page={word.page} word={word.word} image={word.image}
                    audio={word.audio} audioMeaning={word.audioMeaning} audioExample={word.audioExample}
                    textMeaning={word.textMeaning} textExample={word.textExample} transcription={word.transcription}
                    wordTranslate={word.wordTranslate} textMeaningTranslate={word.textMeaningTranslate}
                    textExampleTranslate={word.textExampleTranslate}
              />
          )}
        </div>
      </div>
  )
}
