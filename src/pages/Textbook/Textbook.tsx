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
import { PageList } from '../../components/PageList/PageList';

export const Textbook = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const group = useAppSelector(state => state.textbook.group)
  const page = useAppSelector(state => state.textbook.page);
  const {words, difficult}: { words: IWord[], difficult: IWord[] } = useAppSelector(state => state.textbook)
  const [modalLevel, setModalLevel] = useState(false);
  const [modalPage, setModalPage] = useState(false);
  const [isRightDisabled, setRightDisabled] = useState(false);
  const [isLeftDisabled, setLeftDisabled] = useState(false);
  const pageNumber = parseInt(page);
  const [backgroundColor, setBackgroundColor] = useState(`var(--level${+group + 1})`);

  const disableUnableClicks = () => {
    if (pageNumber === 29) {
      setRightDisabled(true)
      setLeftDisabled(false)
    } else if (pageNumber === 0) {
      setLeftDisabled(true)
      setRightDisabled(false)
    } else if (pageNumber != 0 && isLeftDisabled) {
      setLeftDisabled(false)
    } else if (pageNumber != 29 && isRightDisabled) {
      setRightDisabled(false)
    }
  }
  useEffect(() => {
    if (user) {
      dispatch(initializeAggregatedWords(group, page))
      dispatch(initializeHardWords())
    } else {
      dispatch(initializeWords(group, page))
      setModalLevel(false)
      setModalPage(false)
      setBackgroundColor(`var(--level${+group + 1})`)
      disableUnableClicks();
    }
  }, [group, page])

  const HandleRightClick = () => {
    const nextPage = pageNumber + 1;
    dispatch(setPage(nextPage))
  }
  const HandleLeftClick = () => {
    const prevPage = pageNumber - 1;
    dispatch(setPage(prevPage))

  }

  return (
      <div className={style.textbook}>
        <h1 className={style.textbook_header}>Учебник</h1>
        <div className={style.textbook_buttons}>
          <div className={style.textbook_choose}>
            <button className={`${style.textbook_button} ${style.textbook_level}`}
                    onClick={() => setModalLevel(true)}
                    style={{backgroundColor}}
            >
              Уровень {+group + 1}
            </button>
            {modalLevel && <Modal open={modalLevel} onClose={() => setModalLevel(false)}>
              <LevelList/>
            </Modal>}
          </div>
          <div className={style.textbook_choose}>
            <button className={`${style.textbook_button} ${style.textbook_arrow_left} ${style.page_button}`}
                    onClick={HandleLeftClick}
                    disabled={isLeftDisabled}>&lt;</button>
            <button className={`${style.textbook_button} ${style.textbook_page} ${style.page_button}`}
                    onClick={() => setModalPage(true)}>Страница {pageNumber + 1}</button>
            <button className={`${style.textbook_button} ${style.textbook_arrow_right} ${style.page_button}`}
                    onClick={HandleRightClick}
                    disabled={isRightDisabled}>&gt;</button>
            {modalPage && <Modal open={modalPage} onClose={() => setModalPage(false)}>
              <PageList/>
            </Modal>}
          </div>
          <button className={`${style.textbook_button} ${style.textbook_game} ${style.textbook_call}`}>Аудиовызов
          </button>
          <button className={`${style.textbook_button} ${style.textbook_game} ${style.textbook_sprint}`}>Спринт
          </button>
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
