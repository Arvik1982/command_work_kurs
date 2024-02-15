import React, {useEffect, useState} from 'react';
import styles from "./progress.module.css"
import CustomProgressBar from "../../CustomUiComponents/CustomProgressBar";
import {getLessonsUser} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {setProgress} from "../../store/sliceStore";

function Progress() {
  const courseName = useParams().name
  const lesson = useSelector(state => state.store.lesson);
  const progress = useSelector(state => state.store.progress);
  const id = useParams().id
  const dispatch = useDispatch()
  useEffect(() => {
    getLessonsUser(id, courseName)
        .then(data => {
          dispatch(setProgress(data))
        })
  }, []);
  return (
      <div className={styles.progress__box}>
        <h2 className={styles.progress__title}>Мой прогресс по тренировке:</h2>
        <div className={styles.progress__progressBars}>
          {lesson?.exercises?.map((progressBar, index) => {
            return (
                <div className={styles.progress__progressBox} key={index}>
                  <p>{progressBar?.name}</p>
                  <CustomProgressBar color={'#565EEF'}
                                     progress={Math.floor((progress?.progress?.length >= 1 ? progress?.progress[index]?.yourProgress : 0) / progressBar?.quantity * 100)}/>
                </div>
            )
          })}
        </div>
      </div>
  );
}

export default Progress;