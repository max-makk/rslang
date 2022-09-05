import style from './Textbook.module.css';
import { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import {
  initializeAggregatedWords,
  initializeHardWords,
  initializeLearnedWords,
  initializeWords,
  setPage,
  setTextbookMode,
} from '../../state/reducers/textbook';
import { IWord } from '../../types/types';
import { Word } from '../../components/Word/Word';
import { LevelList } from '../../components/LevelList/LevelList';
import { PageList } from '../../components/PageList/PageList';
import { Link } from 'react-router-dom';
import { setTextbook } from '../../state/reducers/sprint';
import { Footer } from '../../components/Footer/Footer';

export const Textbook = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const group = useAppSelector((state) => state.textbook.group);
  const page = useAppSelector((state) => state.textbook.page);
  const { words, difficult }: { words: IWord[]; difficult: IWord[] } =
    useAppSelector((state) => state.textbook);
  const [modalLevel, setModalLevel] = useState(false);
  const [modalPage, setModalPage] = useState(false);
  const [isRightDisabled, setRightDisabled] = useState(false);
  const [isLeftDisabled, setLeftDisabled] = useState(false);
  const pageNumber = parseInt(page);
  const [backgroundColor, setBackgroundColor] = useState(
    `var(--level${+group + 1})`
  );
  const [difficultWords, setDifficultWords] = useState(false);
  const mode = useAppSelector((state) => state.textbook.mode);

  const disableUnableClicks = () => {
    if (pageNumber === 29) {
      setRightDisabled(true);
      setLeftDisabled(false);
    } else if (pageNumber === 0) {
      setLeftDisabled(true);
      setRightDisabled(false);
    } else if (pageNumber != 0 && isLeftDisabled) {
      setLeftDisabled(false);
    } else if (pageNumber != 29 && isRightDisabled) {
      setRightDisabled(false);
    }
  };
  const diff = () => {
    setDifficultWords((current) => !current);
    if (difficultWords) {
      dispatch(setTextbookMode('words'));
    } else {
      dispatch(setTextbookMode('hard'));
    }
  };

  useEffect(() => {
    if (user) {
      mode === 'words' ? setDifficultWords(false) : setDifficultWords(true);
      dispatch(initializeHardWords());
      dispatch(initializeLearnedWords());
      dispatch(initializeAggregatedWords(group, page));
    } else {
      dispatch(initializeWords(group, page));
    }
    setModalLevel(false);
    setModalPage(false);
    setBackgroundColor(`var(--level${+group + 1})`);
    disableUnableClicks();
  }, [group, page, mode]);

  const HandleRightClick = () => {
    const nextPage = pageNumber + 1;
    dispatch(setPage(nextPage));
  };
  const HandleLeftClick = () => {
    const prevPage = pageNumber - 1;
    dispatch(setPage(prevPage));
  };

  const handleSprintClick = () => {
    dispatch(setTextbook(true));
  };

  return (
    <>
      <div className={style.textbook}>
        <div className={style.textbook_buttons}>
          {mode === 'words' && (
            <div className={style.textbook_choose}>
              <button
                className={`${style.textbook_button} ${style.textbook_arrow_left} ${style.page_button}`}
                onClick={HandleLeftClick}
                disabled={isLeftDisabled}
              >
                &lt;
              </button>
              <button
                className={`${style.textbook_button} ${style.textbook_page} ${style.page_button}`}
                onClick={() => setModalPage(true)}
              >
                Страница {pageNumber + 1}
              </button>
              <button
                className={`${style.textbook_button} ${style.textbook_arrow_right} ${style.page_button}`}
                onClick={HandleRightClick}
                disabled={isRightDisabled}
              >
                &gt;
              </button>
              {modalPage && (
                <Modal open={modalPage} onClose={() => setModalPage(false)}>
                  <PageList />
                </Modal>
              )}
            </div>
          )}
          {mode === 'words' && (
            <div className={style.textbook_choose}>
              <button
                className={`${style.textbook_button} ${style.textbook_level}`}
                onClick={() => setModalLevel(true)}
                style={{ backgroundColor }}
              >
                Уровень {+group + 1}
              </button>
              {modalLevel && (
                <Modal open={modalLevel} onClose={() => setModalLevel(false)}>
                  <LevelList />
                </Modal>
              )}
            </div>
          )}
          <button
            className={`${style.textbook_button} ${style.textbook_game} ${style.textbook_call}`}
          >
            <Link
              to={`/audiogame?group=${group}&page=${page}`}
              className={style.textbook_game_link}
            >
              Аудиовызов
            </Link>
          </button>
          <button
            className={`${style.textbook_button} ${style.textbook_game} ${style.textbook_sprint}`}
            onClick={() => handleSprintClick()}
          >
            <Link to="/sprint" className={style.textbook_game_link}>
              Спринт
            </Link>
          </button>
          {user && (
            <button
              className={`${style.textbook_button} ${style.textbook_hard_words}`}
              onClick={() => diff()}
              style={{
                backgroundColor: difficultWords ? `var(--hard)` : '',
              }}
            >
              Сложные слова
            </button>
          )}
        </div>
        {difficult.length === 0 && mode === 'hard' && (
          <div style={{ textAlign: 'center' }}>Нет сложных слов</div>
        )}
        {mode === 'hard' && (
          <div className={`${style.words} ${style.hardWords}`}>
            {difficult.map((word) => (
              <Word
                key={word._id || word.id}
                id={word._id || word.id}
                group={word.group}
                page={word.page}
                word={word.word}
                image={word.image}
                audio={word.audio}
                audioMeaning={word.audioMeaning}
                audioExample={word.audioExample}
                textMeaning={word.textMeaning}
                textExample={word.textExample}
                transcription={word.transcription}
                wordTranslate={word.wordTranslate}
                textMeaningTranslate={word.textMeaningTranslate}
                textExampleTranslate={word.textExampleTranslate}
                userWord={word.userWord}
              />
            ))}
          </div>
        )}
        {mode === 'words' && (
          <div className={style.words}>
            {words.map((word) => (
              <Word
                key={word._id || word.id}
                id={word._id || word.id}
                group={word.group}
                page={word.page}
                word={word.word}
                image={word.image}
                audio={word.audio}
                audioMeaning={word.audioMeaning}
                audioExample={word.audioExample}
                textMeaning={word.textMeaning}
                textExample={word.textExample}
                transcription={word.transcription}
                wordTranslate={word.wordTranslate}
                textMeaningTranslate={word.textMeaningTranslate}
                textExampleTranslate={word.textExampleTranslate}
                userWord={word.userWord}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
