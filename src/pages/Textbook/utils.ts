const STORAGE_KEY = 'textbookPage'

const setPage = (page: string) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(page))
}

const getPage = () => {
  const pageJSON = window.localStorage.getItem(STORAGE_KEY)
  if (pageJSON) {
    return JSON.parse(pageJSON)
  }
  return null
}

export default {
  setPage,
  getPage
}
