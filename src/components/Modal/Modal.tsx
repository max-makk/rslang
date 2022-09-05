import React from 'react';
import style from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export const Modal = ({children, onClose}: ModalProps) => {
  return (
      <div>
        <div className={style.overlay} onClick={onClose}></div>
        <div className={style.modal}>
          <ul>
            {children}
          </ul>
        </div>
      </div>
  )
}
