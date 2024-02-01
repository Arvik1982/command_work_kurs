import React from 'react';
import styles from './customBtn.module.css'

function CustomButton({children, onClick}) {
  return (
        <button className={styles.customBtn} onClick={onClick}>{children}</button>
  );
}

export default CustomButton;