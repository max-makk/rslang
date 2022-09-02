import wordsService from '../../services/words'
import usersAggregatedWord from '../../services/users-aggregated-word'

import { getRandomGroupNumber, getRandomPageNumber } from '../../utils/utils'
import { IWord } from '../../types/types'

export const getExtraWords = async (group?: string, page?: string) => {
  const words1 = await wordsService.getWords(
    group || String(getRandomGroupNumber()), page || String(getRandomPageNumber())
    )
  const words2 = await wordsService.getWords(
    group || String(getRandomGroupNumber()), page || String(getRandomPageNumber())
    )
  const words3 = await wordsService.getWords(
    group || String(getRandomGroupNumber()), page || String(getRandomPageNumber())
    )
  return [...words1, ...words2, ...words3]
}

export const getExtraAggregatedWords = async (group?: string, page?: string) => {
  const words1 = await usersAggregatedWord.getAggregatedWords(
    group || String(getRandomGroupNumber()), page || String('0')
    )
  const words2 = await usersAggregatedWord.getAggregatedWords(
    group || String(getRandomGroupNumber()), page || String('2')
    )
  const words3 = await usersAggregatedWord.getAggregatedWords(
    group || String(getRandomGroupNumber()), page || String('1')
    )
  return [...words1, ...words2, ...words3]
}

export const createResults = (words: IAggregated[], guessed: String[], unguessed: String[]) => {
  const guessedWords = words.filter(el => guessed.includes(el.id) || guessed.includes(el._id))
  const unguessedWords = words.filter(el => unguessed.includes(el.id) || unguessed.includes(el._id))
  return [guessedWords, unguessedWords]
}

interface IAggregated extends IWord {
  _id: string
  userWord?: {
    difficulty: string
    optional: any
  }
}
