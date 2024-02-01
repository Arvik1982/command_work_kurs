import React from 'react';
import styles from "./progress.module.css"
import CustomProgressBar from "../../CustomUiComponents/CustomProgressBar";

function Progress({progressData}) {
  return (
      <div className={styles.progress__box}>
        <h2 className={styles.progress__title}>Мой прогресс по тренировке 2:</h2>
        <div className={styles.progress__progressBars}>
          {progressData.map(progressBar => {
            return (
                <div className={styles.progress__progressBox} key={progressBar.id}>
                  <p>{progressBar?.text}</p>
                  <CustomProgressBar color={progressBar?.color} progress={progressBar?.yourProgress}/>
                </div>
            )
          })}
        </div>
      </div>
  );
}

export default Progress;