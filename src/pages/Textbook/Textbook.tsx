import style from './Textbook.module.css'
import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';

export const Textbook = () => {
  const [modal, setModal] = useState(false);
  return (
      <div className={style.textbook}>
        <h1 className={style.textbook_header}>Учебник</h1>
        <div className={style.textbook_buttons}>
          <div className={style.textbook_choose}>
            <button className={`${style.textbook_button} ${style.textbook_level}`}
                    onClick={() => setModal(true)}
            >
              <span>A1</span>
              <span>Elementary</span>
            </button>
            {modal && <Modal open={modal} onClose={() => setModal(false)}>
              {/*<Level/>*/}
            </Modal>}
          </div>
          <div className={style.textbook_pages}>
            <button className={`${style.textbook_button} ${style.textbook_arrow_left}`}>&lt;</button>
            <button className={`${style.textbook_button} ${style.textbook_page}`}>Страница 1</button>
            <button className={`${style.textbook_button} ${style.textbook_arrow_right}`}>&gt;</button>
          </div>
          <button className={`${style.textbook_button} ${style.textbook_call}`}>Аудиовызов</button>
          <button className={`${style.textbook_button} ${style.textbook_sprint}`}>Спринт</button>
          <button className={`${style.textbook_button} ${style.textbook_hard_words}`}>Сложные слова</button>
        </div>
      </div>
  )
}
