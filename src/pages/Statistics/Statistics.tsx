import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../state/hooks"
import { getWords } from "../../state/thunks"
import { setPage } from "../../state/slices/textbookSlice"
import { Word } from "../../types/types"

export const Statistics = () => {

  const {words, learned, difficult, group, page} = useAppSelector(state => state.textbook)


  // const {user} = useAppSelector(state => state.user)

  const user = true; // false 

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getWords({group: group, page: page}))
  },[page])

  const changePage = () => {
    dispatch(setPage('2'))
  }

  return <div>
    <button onClick={changePage}>click</button>
    {words.map((el: Word, i) => <div key={i}>{el.textMeaningTranslate}</div>)}
    стоистика
  </div>
}