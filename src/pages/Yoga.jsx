
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState  } from 'react';
import styleBody from "../styleBody";
import BlackLogo from "../components/Logo/BlackLogo";
import courseImg from '../img/skill card 17.png';
import purposes from '../img/Group 48096488.png';
import iogaNaw from '../img/iogaNaw.png';
import iogaNew from '../img/iogaNew.png';
import info from '../img/info.png';
import info_button from '../img/info_button.svg'
import buttonImage from '../img/Group 48096487.svg';
import styles from './css/ioga.module.css';
import Burger from '../components/Burger';
import Modal from '../components/Modal';

export default function DescriptionPage() {
    const [isOpenModalNext, setIsOpenModalNext] = useState(false);
    const userIsRegistered = localStorage.getItem('userUid')
    const courseId = useParams();
    const courses = useSelector(state => state.store.trainingsArray);
    const courseData = courses.find(course => course.nameEN === courseId.id);

    useEffect(() => {
        
        styleBody('#fff')
    }, []);

    const handleModalClick = () => {
        setIsOpenModalNext(!isOpenModalNext);
    };

    return (
        <div className={styles.course__page}>
            <div className={styles.course__page_logo}>
                <BlackLogo />
                <Burger />
            </div>
            <div className={styles.course__page_image}>
                <img src={courseImg} alt="courseimage" />
            </div>
            <div className={styles.center_text}>
                <h2>Подойдет для вас, если:</h2>
                <div className={styles.course__ioga_image}>
                    <img src={purposes} alt="purposes" />
                </div>
            </div>
            <div className={styles.course__directions_text}>
                <h2>Направления</h2>
                <div className={styles.course__directions_image}>
                    <img src={iogaNaw} alt="iogaNaw" />
                    <img src={iogaNew} alt="iogaNew" />
                </div>
            </div>
            <div className={styles.course__directions_info}>
                <img src={info} alt="info" />
            </div>
            <div className={styles.info_block}>
                <h2 className={styles.info_text}>
                <img src={info_button} alt="info_button" />
                </h2>
                <div className={styles.button}>
                {userIsRegistered ? (
                    <button className={styles.button_text} onClick={handleModalClick}>
                    Начать тренировку
                </button>
                ) : (
                    <Link to="/Auth" className={styles.button_text}>
                        Записаться на тренировку
                    </Link>
                )}
            </div>
                <div className={styles.info_image}>
                    <img src={buttonImage} alt="buttonImage" />
                </div>
            </div>
            <Modal isOpenModalNext={isOpenModalNext} handleModalClick={handleModalClick} selectedTraining={courseData} />

        </div>
    );
}
