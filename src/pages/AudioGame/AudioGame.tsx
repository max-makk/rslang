import { useAppDispatch, useAppSelector } from '../../state/hooks';
import style from './AudioGame.module.css';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import {
  setGroup,
  setPage,
  setWords,
  seUnlearnedtWordIds,
} from '../../state/reducers/audiogame';
import srv from '../../services/words';
import { useEffect, useMemo, useState } from 'react';
import { IWord } from '../../types/types';
import { getRandomGroupElementInArray, shuffle } from '../../helpers/array';
import { Word } from '../../components/Word/Word';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Statistic } from '../../components/Statistic/Statistic';

enum englishLevel {
  Уровень1,
  Уровень2,
  Уровень3,
  Уровень4,
  Уровень5,
  Уровень6,
}

export const AudioGame = () => {
  const dispatch = useAppDispatch();
  const words: IWord[] = useAppSelector((state) => state.audiogame.words);
  const baseUrl = 'http://localhost:3001';

  const [wordIndex, setWordIndex] = useState(0);
  const [isAnswerGiven, setIsAnswerGiven] = useState(false);
  const word = words.length ? words[wordIndex] : undefined;
  const playAudio = () => {
    if (word) {
      const audioTrack = new Audio(`${baseUrl}/${word?.audio}`);
      audioTrack.play();
    }
  };

  useEffect(() => {
    playAudio();
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
      const words = await srv.getWords(group, 0);
      dispatch(setGroup(group));
      dispatch(setPage(0));
      dispatch(setWords(shuffle(words)));
    }
  };

  const onAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const translate = e.currentTarget.dataset['translate'];
    setIsAnswerGiven(true);
    if (translate) {
      playAudio();
      if (translate === word?.wordTranslate) {
        e.currentTarget.style.backgroundColor = 'green';
      } else {
        e.currentTarget.style.backgroundColor = 'red';
        dispatch(seUnlearnedtWordIds(word?.id));
      }
    }
  };

  const nextItemHandle = () => {
    if (isAnswerGiven) {
      setWordIndex(wordIndex + 1);
      setIsAnswerGiven(false);
    } else {
      playAudio();
      setIsAnswerGiven(true);
    }
  };

  return (
    <div className={style.audiogame_wrapper}>
      Выберите уровень:
      <div className={style.audiogame_level_wrapper}>
        {Object.keys(englishLevel)
          .filter((value) => isNaN(Number(value)) === true)
          .map((level) => (
            <button
              className={style.audiogame_level}
              data-group={Object.values(englishLevel).indexOf(level)}
              onClick={difficultySelectionHandler}
            >
              {level}
            </button>
          ))}
      </div>
      {words?.length &&
        (wordIndex >= words.length ? (
          <Statistic />
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
                        ? 'green'
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
              onClick={nextItemHandle}
            >
              {isAnswerGiven ? <ArrowRightAltIcon /> : 'не знаю'}
            </button>
          </div>
        ))}
    </div>
  );
};
