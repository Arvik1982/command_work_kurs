import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Modal.module.css';
import done from '../../img/img_profile/Done.png';
import {Link} from "react-router-dom";

const ModalCourse = ({ isOpenModalNext, handleModalClick, trainingsArray}) => {
const courseName = useSelector(state => state.store.courseName);
const isCourseCompleted = (courseId, workoutId) => {
  const course = trainingsArray.find(course => course._id === courseId);
  if (course && course.progress && course.progress[workoutId]) {
    for (const key in course.progress[workoutId]) {
      if (course.progress[workoutId][key] !== 0) {
        return true;
      }
    }
  }
  return false;
};
// Создание объекта с соответствием курсов и их идентификаторов
const courseIds = {
  StepAirobic: '6i67sm',
  Yoga: 'ab1c3f',
  Stretching: 'kfpq8e',
  BodyFlex: 'q02a6i',
  DanceFitness: 'ypox9r'
};

// Получение идентификатора для выбранного курса
const courseId = courseIds[courseName];
  // Заполнение контента для СТЕП-АЭРОБИКИ (сделано)
  const stepAirobicContent = [
    { id: 'e9ghsb', text: 'Урок 1', info: 'Основы' },
    { id: 'a1rqtt', text: 'Урок 2', info: 'Основные движения' },
    { id: 'mstcbg', text: 'Урок 3', info: 'Новые движения' },
    { id: 't3cpno', text: 'Урок 4', info: 'Продвинутые движения' },
  ];
// Заполнение контента для ЙОГИ (сделано)
  const yogaContent = [
    { id: '3yvozj', text: 'Утренняя практика', info: 'Йога на каждый день / 1 день' },
    { id: 'hfgxlo', text: 'Красота и здоровье', info: 'Йога на каждый день / 2 день' },
    { id: 'kcx5ai', text: 'Асаны стоя', info: 'Йога на каждый день / 3 день' },
    { id: 'kt6ah4', text: 'Растягиваем мышцы бедра', info: 'Йога на каждый день / 4 день' },
    { id: 'mrhuag', text: 'Гибкость спины', info: 'Йога на каждый день / 5 день' }
  ];
// Заполнение контента для СТРЕТЧИНГА (сделано)
  const stretchingContent = [
    { id: '9mefwq', text: 'Урок 1', info: 'Основы стретчинга' },
    { id: '9yolz2', text: 'Урок 2', info: 'Разогрев мышц' },
    { id: 'pi5vtr', text: 'Урок 3', info: 'Разогрев мышц 2.0' },
  ];
// Заполнение контента для БОДИФЛЕКСА (сделано)
  const bodyFlexContent = [
    { id: 'xlpkqy', text: 'Техника дыхания', info: 'Содержимое для BodyFlex' },
    { id: '17oz5f', text: 'Тренировка мышц бедер', info: 'Содержимое для BodyFlex' },
    { id: 'pyvaec', text: 'Тренировка иышц ягодиц', info: 'Содержимое для BodyFlex' },
  ];
// Заполнение контента для ТАНЦЕВАЛЬНЫЙ ФИТНЕС (сделано)
  const DanceFitness = [
    { id: 'gh7bd5', text: 'Урок 1', info: 'Основы' },
    { id: 'hwsut5', text: 'Урок 2', info: 'Основные движения' },
    { id: 'n18r8v', text: 'Урок 3', info: 'Новые движения' },
    { id: 'dq9rzo', text: 'Урок 4', info: 'Продвинутые движения' },
    { id: 'rr70ie', text: 'Урок 5', info: 'Мастер-класс' },
  ];
// Создание содержимого формы на основе выбранного курса
const getContent = (contentArray, courseIndex) => {
  return contentArray.map((item, index) => (
    // <Link to={`/workout/${item.id}`} key={index}>
    <Link to={`/workout/${item.id}/${courseName}`} key={index}>
      <div className={isCourseCompleted(courseId, item.id) ? styles.modalContentBlock : styles.modalContentBlockNotDone}>
        <span className={styles.modalContentTextOne}>{item.text}</span>
        {isCourseCompleted(courseId, item.id) && <img src={done} className={styles.modalContentDone} />}
        <span>{item.info}</span>
      </div>
    </Link>
  ));
};
  return (
    isOpenModalNext && (
      <form className={styles.modalOverlayTwo}>
        <div className={styles.modal} onClick={handleModalClick}>
          <div className={styles.modalContentTwo}>
            <span className={styles.modalContentTitle}>Выберите тренировку</span>
            <div className={styles.modalContentMainBottom}>
              {courseName === 'StepAirobic' && getContent(stepAirobicContent)}
              {courseName === 'Yoga' && getContent(yogaContent)}
              {courseName === 'Stretching' && getContent(stretchingContent)}
              {courseName === 'BodyFlex' && getContent(bodyFlexContent)}
              {courseName === 'DanceFitness' && getContent(DanceFitness)}
            </div>
          </div>
        </div>
      </form>
    )
  );
};

export default ModalCourse;