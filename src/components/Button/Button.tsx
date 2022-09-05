import styles from './Button.module.css';
import React from "react";

interface ButtonProps {
  className?: string
  onClick?: () => void;
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const Button = ({className, onClick, children, style}: ButtonProps) => {
  return (
      <button className={`${styles.button} ${className}`} onClick={onClick} style={style}>
        {children}
      </button>
  )
}
