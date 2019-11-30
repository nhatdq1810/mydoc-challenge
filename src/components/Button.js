import React from 'react';
import styles from './Button.module.scss';

export default function Button({ onClick, children, disabled = false, className = '' }) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${className} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
