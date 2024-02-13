import styles from './css/videoPage.module.css'
import BlackLogo from "../components/Logo/BlackLogo";
import Progress from "../components/Progress/Progress";
import {useEffect, useState} from "react";
import styleBody from "../styleBody";
import Burger from "../components/Burger";
import ModalProgress from "../components/Modal/ModalProgress";
import CustomButton from "../CustomUiComponents/CustomBtn/CustomButton";
import {useParams} from "react-router-dom";
import {getLesson} from "../api";
import {useDispatch, useSelector} from "react-redux";
import {setLesson} from "../store/sliceStore";
import progress from "../components/Progress/Progress";

function VideoPage() {
  const id = useParams().id
  const nameCourse = useParams().name
  const [isOpenModal, setOpenModal] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const lesson = useSelector(state => state.store.lesson);
  const exercises = useSelector(state => state.store.lesson)?.exercises
  const dispatch = useDispatch()

  useEffect(() => {
    styleBody('#fff')
    const userEmailFromStorage = localStorage.getItem('userLogin');
    const userPasswordFromStorage = localStorage.getItem('userPass');
    if (userEmailFromStorage) {
      setCurrentUser({email: userEmailFromStorage, password: userPasswordFromStorage});
    }
    getLesson(id).then(
        lessonData => {
          if (lessonData)
            dispatch(setLesson(lessonData))
          console.log(lesson)
        }
    )
  }, [])

  const handleModal = () => {
    setOpenModal(prevState => !prevState)
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <BlackLogo route='/profile'/>
          <Burger currentUser={currentUser}/>
        </div>
        <h2 className={styles.video__title}>{nameCourse}</h2>
        <p className={styles.video__lesson}>{lesson?.name}</p>
        <iframe
            className={styles.video__play}
            src={lesson?.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
        {exercises && (
            <>
              <div className={styles.video__box}>
                <div className={styles.video__left}>
                  <h3 className={styles.left__title}>Упражнения</h3>
                  <ul className={styles.left__lessons}>
                    {lesson?.exercises?.map((exercise, index) => {
                      return <li key={index}>{exercise?.name}</li>
                    })}
                  </ul>
                  <CustomButton onClick={handleModal}>Заполнить свой прогресс</CustomButton>
                </div>
                <div className={styles.video__right}>
                  <Progress lesson={lesson}/>
                </div>
              </div>
              <ModalProgress isOpenModal={isOpenModal}
                             handleModal={handleModal}/>
            </>
        )}
      </div>
  );
}

export default VideoPage;