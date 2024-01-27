import React from 'react';
import styles from './Modal.module.css'; // подключите стили для модального окна
import done from '../../img/img_profile/Done.png';

const Modal = ({ isOpenModalNext, handleModalClick, selectedTraining }) => {
  return (
    isOpenModalNext && (
        <form className={styles.modalOverlayTwo}>
          <div className={styles.modal} onClick={handleModalClick}>
            <div className={styles.modalContentTwo}>
              {selectedTraining === 'Yoga' &&
                <div className={styles.modalContentMain}>
                  <span className={styles.modalContentTitle}>Выберите тренировку</span>
                  <div className={styles.modalContentMainBottom}>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Утренняя практика</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Йога на каждый день / 1 день</span>
                    </div>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Красота и здоровье</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Йога на каждый день / 2 день</span>
                    </div>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Асаны стоя</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Йога на каждый день / 3 день</span>
                    </div>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Растягиваем мышцы бедра</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Йога на каждый день / 4 день</span>
                    </div>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Гибкость спины</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Йога на каждый день / 5 день</span>
                    </div>
                  </div>
                </div>
              }
              {selectedTraining === 'Stretching' &&
                <div className={styles.modalContentMain}>
                  <span className={styles.modalContentTitle}>Выберите тренировку</span>
                  <div className={styles.modalContentMainBottom}>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Урок 1</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Основы</span>
                    </div>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Урок 2</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Основные движения</span>
                    </div>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Урок 3</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Новые движения</span>
                    </div>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Урок 4</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Продвинутые движения</span>
                    </div>
                    <div className={styles.modalContentBlock}>
                      <span className={styles.modalContentTextOne}>Урок 5</span>
                      <img  src={done} className={styles.modalContentDone}/>
                      <span>Мастер-класс</span>
                    </div>
                  </div>
                </div>
              }
              {selectedTraining === 'BodyFlex' && <div>BodyFlex</div>}
            </div>
          </div>
        </form>
      )
  );
};

export default Modal;