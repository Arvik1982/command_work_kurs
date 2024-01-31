import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Modal.module.css';
import done from '../../img/img_profile/Done.png';

const Modal = ({ isOpenModalNext, handleModalClick}) => {
  // Получаем название курса из Redux Store
  const courseName = useSelector(state => state.store.courseName);
  // Заполнение контента для СТЕП-АЭРОБИКИ (сделано)
  const stepAirobicContent = [
    { text: 'Урок 1', info: 'Основы' },
    { text: 'Урок 2', info: 'Основные движения' },
    { text: 'Урок 3', info: 'Новые движения' },
    { text: 'Урок 4', info: 'Продвинутые движения' },
  ];
// Заполнение контента для ЙОГИ (сделано)
  const yogaContent = [
    { text: 'Утренняя практика', info: 'Йога на каждый день / 1 день' },
    { text: 'Красота и здоровье', info: 'Йога на каждый день / 2 день' },
    { text: 'Асаны стоя', info: 'Йога на каждый день / 3 день' },
    { text: 'Растягиваем мышцы бедра', info: 'Йога на каждый день / 4 день' },
    { text: 'Гибкость спины', info: 'Йога на каждый день / 5 день' }
  ];
// Заполнение контента для СТРЕТЧИНГА (сделано)
  const stretchingContent = [
    { text: 'Урок 1', info: 'Основы стретчинга' },
    { text: 'Урок 2', info: 'Разогрев мышц' },
    { text: 'Урок 3', info: 'Разогрев мышц 2.0' },
  ];
// Заполнение контента для БОДИФЛЕКСА (сделано)
  const bodyFlexContent = [
    { text: 'Техника дыхания', info: 'Содержимое для BodyFlex' },
    { text: 'Тренировка мышц бедер', info: 'Содержимое для BodyFlex' },
    { text: 'Тренировка иышц ягодиц', info: 'Содержимое для BodyFlex' },
  ];
// Заполнение контента для ТАНЦЕВАЛЬНЫЙ ФИТНЕС (сделано)
  const DanceFitness = [
    { text: 'Урок 1', info: 'Основы' },
    { text: 'Урок 2', info: 'Основные движения' },
    { text: 'Урок 3', info: 'Новые движения' },
    { text: 'Урок 4', info: 'Продвинутые движения' },
    { text: 'Урок 5', info: 'Мастер-класс' },
  ];
// Создание содержимого формы на основе выбранного курса
  const getContent = (contentArray) => {
    return contentArray.map((item, index) => (
      <div className={styles.modalContentBlock} key={index}>
        <span className={styles.modalContentTextOne}>{item.text}</span>
        <img src={done} className={styles.modalContentDone} />
        <span>{item.info}</span>
      </div>
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

export default Modal;