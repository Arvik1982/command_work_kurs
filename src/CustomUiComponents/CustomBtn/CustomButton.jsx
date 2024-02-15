import React from 'react';
import styles from './customBtn.module.css'

function CustomButton({children, onClick, disabled}) {
  const style = {
    background: disabled ? 'green' : '',
    borderColor: disabled ? 'green' : ''
  }
  return (
        <button style={style} className={styles.customBtn} onClick={onClick} disabled={disabled}>{children}</button>
  );
}

export default CustomButton;