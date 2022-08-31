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
    group || String(getRandomGroupNumber()), page || String(getRandomPageNumber())
    )
  const words2 = await usersAggregatedWord.getAggregatedWords(
    group || String(getRandomGroupNumber()), page || String(getRandomPageNumber())
    )
  const words3 = await usersAggregatedWord.getAggregatedWords(
    group || String(getRandomGroupNumber()), page || String(getRandomPageNumber())
    )
  return [...words1[0].paginatedResults, ...words2[0].paginatedResults, ...words3[0].paginatedResults]
}

interface IAggregated extends IWord {
  userWord?: {
    difficulty: string
    optional: any
  }
}
