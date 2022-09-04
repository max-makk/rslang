import style from './PageList.module.css'
import { useAppDispatch } from '../../state/hooks';
import { setPage } from '../../state/reducers/textbook';

export const PageList = () => {
  const pages = [];
  for (let i = 0; i < 30; i++) {
    pages.push(i)
  }
  const dispatch = useAppDispatch();
  return (
      <ul className={style.page_list}>
        {pages.map((page) =>
            <li key={page} className={style.page_item}
                onClick={() => dispatch(setPage(page.toString()))}>Страница {page + 1}</li>
        )}
      </ul>
  )
}
