import { useAppDispatch, useAppSelector } from '../../state/hooks';
import style from './AudioGame.module.css';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import {
  setGroup,
  setPage,
  setWords,
  setUnlearnedtWordIds,
  setPassedGroup,
  resetsetUnlearnedtWordIds,
} from '../../state/reducers/audiogame';
import srv from '../../services/words';
import { useEffect, useMemo, useState } from 'react';
import { IWord } from '../../types/types';
import { getRandomGroupElementInArray, shuffle } from '../../helpers/array';
import { Word } from '../../components/Word/Word';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Statistic } from '../../components/Statistic/Statistic';
import { dividerClasses } from '@mui/material';

enum englishLevel {
  Уровень1,
  Уровень2,
  Уровень3,
  Уровень4,
  Уровень5,
  Уровень6,
}

const successColor = 'green';
const failColor = 'red';
const baseUrl = 'https://learnwords-backend.herokuapp.com';

export interface AudioGameProps {}

export const AudioGame = () => {
  const dispatch = useAppDispatch();
  const words: IWord[] = useAppSelector((state) => state.audiogame.words);
  const passed: Record<string, number[]> = useAppSelector(
    (state) => state.audiogame.passedGrops
  );
  const currentGroup: number = useAppSelector((state) => state.audiogame.group);
  const currentPage: number = useAppSelector((state) => state.audiogame.page);
  const unLearnedWorIds: Set<string> = new Set(
    useAppSelector((state) => state.audiogame.unlearnedIds)
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [isAnswerGiven, setIsAnswerGiven] = useState(false);
  const word = words.length ? words[wordIndex] : undefined;

  const queryParams = new URLSearchParams(window.location.search);
  const group = parseInt(queryParams.get('group') ?? '-1');
  const page = parseInt(queryParams.get('page') ?? '-1');

  const playAudio = () => {
    if (word) {
      const audioTrack = new Audio(`${baseUrl}/${word?.audio}`);
      Promise.all([audioTrack.play()]);
    }
  };

  useEffect(() => {
    dispatch(setGroup(group));
    dispatch(setPage(page));

    if (group >= 0 && page >= 0) {
      srv.getWords(group, page).then((words) => {
        dispatch(setWords(shuffle(words)));
      });
    }
    return () => {
      dispatch(setWords([]));
      dispatch(resetsetUnlearnedtWordIds([]));
    };
  }, [dispatch, group, page]);

  useEffect(() => {
    if (word?.audio) {
      playAudio();
    }
  }, [word?.audio]);

  const translates = useMemo(
    () =>
      words.length
        ? shuffle([
            word?.wordTranslate,
            ...getRandomGroupElementInArray(
              words.reduce(
                (acc, x) =>
                  x.wordTranslate === word?.wordTranslate
                    ? acc
                    : [...acc, x.wordTranslate],
                [] as string[]
              ),
              4
            ),
          ])
        : [],
    [word?.wordTranslate, words]
  );

  const difficultySelectionHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const group = e.currentTarget.dataset['group'];
    if (group) {
      let page = 0;

      while (passed[group] && page < 30) {
        if (!~passed[group].indexOf(page)) {
          break;
        }
        page++;
      }

      const words = await srv.getWords(group, page);
      dispatch(setGroup(group));
      dispatch(setPage(page));
      dispatch(setWords(shuffle(words)));
    }
  };

  const onAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const translate = e.currentTarget.dataset['translate'];
    setIsAnswerGiven(true);
    if (translate) {
      playAudio();
      if (translate === word?.wordTranslate) {
        e.currentTarget.style.backgroundColor = successColor;
      } else {
        e.currentTarget.style.backgroundColor = failColor;
        dispatch(setUnlearnedtWordIds(word?.id));
      }
    }
  };

  const nextItemHandle = () => {
    if (isAnswerGiven) {
      setWordIndex(wordIndex + 1);
      setIsAnswerGiven(false);
    } else {
      playAudio();
      dispatch(setUnlearnedtWordIds(word?.id));
      setIsAnswerGiven(true);
    }
  };

  const onStatisticClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setWordIndex(0);
    const payLoad = {} as Record<number, number[]>;
    payLoad[currentGroup] = [...(passed[currentGroup] ?? []), currentPage];
    dispatch(setPassedGroup(payLoad));
    dispatch(setWords([]));
    dispatch(resetsetUnlearnedtWordIds([]));
  };

  const getLearnedWords = () => {
    return words.filter((w) => !unLearnedWorIds.has(w.id));
  };

  const getUnLearnedWords = () => {
    return words.filter((w) => unLearnedWorIds.has(w.id));
  };

  return (
    <div className={style.audiogame_wrapper}>
      {!words?.length && (
        <>
          Выберите уровень:
          <div className={style.audiogame_level_wrapper}>
            {Object.keys(englishLevel)
              .filter((value) => isNaN(Number(value)) === true)
              .map((level) => (
                <button
                  className={style.audiogame_level}
                  key={level}
                  data-group={Object.values(englishLevel).indexOf(level)}
                  onClick={difficultySelectionHandler}
                >
                  {level}
                </button>
              ))}
          </div>
        </>
      )}
      {!!words?.length &&
        (wordIndex >= words.length ? (
          <Statistic
            learnedWords={getLearnedWords()}
            unlearnedWords={getUnLearnedWords()}
            onClose={onStatisticClose}
          />
        ) : (
          <div className={style.audiogame_gamewindow}>
            {isAnswerGiven && word ? (
              <div className={style.word_card}>
                <Word
                  id={word.id}
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
                />
              </div>
            ) : (
              <div className={style.audiogame_gamewindow_main_wrapper}>
                <div className={style.audiogame_gamewindow_main}>
                  <button
                    className={style.audiogame_gamewindow_sound}
                    data-audio={word?.audio}
                    onClick={playAudio}
                  >
                    <MusicNoteRoundedIcon className={style.audio} />
                  </button>
                </div>
              </div>
            )}
            <div className={style.audiogame_gamewindow_words_string}>
              {translates.map((translate, index) => (
                <button
                  key={`${translate}_${index}`}
                  className={style.audiogame_gamewindow_word}
                  style={{
                    background:
                      isAnswerGiven && translate === word?.wordTranslate
                        ? successColor
                        : 'white',
                  }}
                  data-translate={translate}
                  onClick={onAnswer}
                >
                  {translate}
                </button>
              ))}
            </div>
            <button
              className={style.audiogame_gamewindow_next_btn}
              style={{ padding: isAnswerGiven ? 0 : '0.7em' }}
              onClick={nextItemHandle}
            >
              {isAnswerGiven ? <ArrowRightAltIcon /> : 'не знаю'}
            </button>
          </div>
        ))}
    </div>
  );
};
