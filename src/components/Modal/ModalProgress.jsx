import React, {useState} from "react";
import styles from './Modal.module.css'
import CustomButton from "../../CustomUiComponents/CustomBtn/CustomButton";
import successImg from '../.././img/img_succes/success.png'
import {useDispatch, useSelector} from "react-redux";
import {getLessonsUser, postCourse} from "../../api";
import {setProgress} from "../../store/sliceStore";
import {useParams} from "react-router-dom";

function ModalProgress({progressData, isOpenModal, handleModal}) {
  const id = useParams().id
  const [isSuccess, setSuccess] = useState(null)
  const exercises = useSelector(state => state.store.lesson)?.exercises
  const courseName = useSelector(state => state.store.lesson)?.name
  const courseId = useSelector(state => state.store.lesson)?._id
  const [newProgress, setNewProgress] = useState([])
  const [error, setError] = useState(null)
  const dispatch = useDispatch()


  const changeProgress = (e, index) => {
    const text = e.target.value
    if (text <= exercises[index].quantity){
      setError(false)
      setNewProgress(prevState => {
        prevState[index] = {
          yourProgress: +text,
          quantity: exercises[index].quantity
        }
        return prevState
      })
      console.log(newProgress)
    } else {
      setError(true)
    }
  }

  const handlePostChange = (e) => {
    e.preventDefault()
    if (!error) {
      setSuccess(true)
      postCourse(courseId, courseName, newProgress)

      setTimeout(() => {
        setNewProgress([])
        getLessonsUser(id)
            .then(data => {
              console.log(data, 'ekpfkepfkpepfkpef')
              dispatch(setProgress(data))
            })
        handleModal()
        setSuccess(false)
      }, 2000)
    }
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
                          {exercises?.map((exercise,index) => {
                            return (
                                <div key={index}>
                                  <p>Сколько раз вы сделали {exercise?.name?.toLowerCase()}?</p>
                                  <input className={styles.input} placeholder='Введите значение' type="number"
                                         onChange={(e) => {
                                           changeProgress(e, index)
                                         }}/>
                                </div>
                            )
                          })}
                        {error && <div style={{color: "red"}}>Ошибка</div>}
                        <CustomButton onClick={handlePostChange}>Отправить</CustomButton>
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