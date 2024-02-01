import styles from './css/videoPage.module.css'
import BlackLogo from "../components/Logo/BlackLogo";
import Progress from "../components/Progress/Progress";
import video from "./video.mp4"
import {useEffect, useState} from "react";
import styleBody from "../styleBody";
import Burger from "../components/Burger";
import ModalProgress from "../components/Modal/ModalProgress";
import CustomButton from "../CustomUiComponents/CustomBtn/CustomButton";

function VideoPage() {
  const [isOpenModal, setOpenModal] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [progressData, setProgressData] = useState(
      [
        {
          id: 1,
          text: 'Наклоны вперед',
          yourProgress: 45,
          color: '#565EEF',
          countEnd: 10
        },
        {
          id: 2,
          text: 'Наклоны назад',
          yourProgress: 90,
          color: '#FF6D00',
          countEnd: 10

        },
        {
          id: 3,
          text: 'Поднятие ног, согнутых в коленях',
          yourProgress: 30,
          color: '#9A48F1',
          countEnd: 5
        }
      ]
  )

  useEffect(() => {
    styleBody('#fff')
    const userEmailFromStorage = localStorage.getItem('userLogin');
    const userPasswordFromStorage = localStorage.getItem('userPass');
    if (userEmailFromStorage) {
      setCurrentUser({email: userEmailFromStorage, password: userPasswordFromStorage});
    }
  },[])

  const handleModal = () => {
    setOpenModal(prevState => !prevState)
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <BlackLogo route='/profile'/>
          <Burger currentUser={currentUser}/>
        </div>
        <h2 className={styles.video__title}>Йога</h2>
        <p className={styles.video__lesson}>
          Красота и здоровье / Йога на каждый день / 2 день
        </p>
        <video className={styles.video__play} src={video} controls>
        </video>
        <div className={styles.video__box}>
          <div className={styles.video__left}>
            <h3 className={styles.left__title}>Упражнения</h3>
            <ul className={styles.left__lessons}>
              <li>Наклон вперед (10 повторений)</li>
              <li>Наклон назад (10 повторений)</li>
              <li>Поднятие ног, согнутых в коленях (5 повторений)</li>
            </ul>
            <CustomButton onClick={handleModal}>Заполнить свой прогресс</CustomButton>
          </div>
          <div className={styles.video__right}>
            <Progress progressData={progressData}/>
          </div>
        </div>
        <ModalProgress progressData={progressData} setProgressData={setProgressData} isOpenModal={isOpenModal} handleModal={handleModal}/>
      </div>
  );
}

export default VideoPage;