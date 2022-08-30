import wordsService from '../services/words'
import { Word } from '../types/types'

export const getRandomPageNumber = () => {
  return Math.floor(Math.random() * 30)
}

export const getRandomGroupNumber = () => {
  return Math.floor(Math.random() * 6)
}

export const shuffle =(array: any) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export const createSprintDeck = (arr: Word[]) => {
  const correct = []
  const incorrect = []
  const res = []
  for(let i of arr) {
    const rnd = Math.random() > 0.5
    if(rnd) correct.push(i)
    else incorrect.push(i)
  }
  for(let i of correct) {
    res.push({
      id: i.id,
      word: i.word,
      wordTranslate: i.wordTranslate,
      result: true
    })
  }
  for(let k = 0; k < incorrect.length; k++) {
    let idx = 0;
    if (k === incorrect.length - 1) {
      idx = 0
    } else {
      idx = k + 1
    }
    res.push({
      id: incorrect[k].id,
      word: incorrect[k].word,
      wordTranslate: incorrect[idx].wordTranslate,
      result: false
    })
  }

  return shuffle(res)
}