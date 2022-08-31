import React from 'react'
import wordsService from '../../services/words'
import userWordsService from '../../services/users-aggregated-word'

import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { getRandomGroupNumber, getRandomPageNumber } from '../../utils/utils'
import usersAggregatedWord from '../../services/users-aggregated-word'
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
  return [...words1, ...words2, ...words3]
}

interface IAggregated extends IWord {
  userWord?: {
    difficulty: string
    optional: any
  }
}

export const UpdateUserWords = () => {
  const dispatch = useAppDispatch()
  const words: IAggregated[] = useAppSelector(state => state.sprint.words)
  const res = words.filter(el => {
    if(el.userWord) {
      return true
    } else {
      return false
    }
  })
  console.log(res)
  const guessed = useAppSelector(state => state.sprint.guessed)
  const unguessed = useAppSelector(state => state.sprint.unguessed)

}