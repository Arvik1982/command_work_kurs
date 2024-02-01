import React, {useEffect, useState} from "react";
import styles from './Modal.module.css'
import CustomButton from "../../CustomUiComponents/CustomBtn/CustomButton";
import successImg from '../.././img/img_succes/succes.jpg'

function ModalProgress({progressData, setProgressData, isOpenModal, handleModal}) {
  const [isSuccess, setSuccess] = useState(null)
  const inputText = (count, id) => {
    setProgressData(prevState => {
      return prevState.map(bar => {
        if (bar.id === id) {
          bar.yourProgress = count
          console.log(bar.id, id, bar)
          return bar
        }
        return bar
      })
    })
    console.log(progressData)
  }

  return (
      isOpenModal && (
          <form className={styles.modalOverlayTwo}>
            {!isSuccess
                ?
                (
                    <div className={styles.modal}>
                      <div className={styles.modalContentTwo}>
                        <span className={styles.modalContentTitle}>Мой прогресс</span>
                        <div>
                          <p>Сколько раз вы сделали наклоны вперед?</p>
                          <input type="number" onInput={(e) => {
                            const text = e.target?.value / progressData[1].countEnd * 100
                            inputText(text, progressData[0].id)
                          }}/>
                        </div>
                        <div>
                          <p>Сколько раз вы сделали наклоны вперед?</p>
                          <input type="number" onInput={(e) => {
                            const text = e.target?.value / progressData[1].countEnd * 100
                            inputText(text, progressData[1].id)
                          }}/>
                        </div>
                        <div>
                          <p>Сколько раз вы сделали наклоны вперед?</p>
                          <input type="number" onInput={(e) => {
                            const text = e.target?.value / progressData[1].countEnd * 100
                            inputText(text, progressData[2].id)
                          }}/>
                        </div>
                        <CustomButton onClick={() => {
                          setSuccess(true)
                          setTimeout(() => {
                            handleModal()
                            setSuccess(false)
                          }, 2000)
                        }}>Отправить</CustomButton>
                      </div>
                    </div>
                )
                :
                <div className={`${styles.modal} ${styles.padding}`}>
                  <h2 className={styles.modal}>Ваш прогресс
                    засчитан!</h2>
                  <img className={styles.successImg} src={successImg} alt="успех"/>
                </div>
            }

          </form>
      )
  );
}

export default ModalProgress;