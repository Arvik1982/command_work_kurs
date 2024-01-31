import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
    const [isOpenModalNext, setIsOpenModalNext] = useState(false); // Инициализация состояния модального окна
    const { id } = useParams(); // Получение параметра маршрута
    const courses = useSelector(state => state.store.trainingsArray); // Получение данных из Redux store
    const userIsRegistered = localStorage.getItem('userUid'); // Проверка, зарегистрирован ли пользователь

    useEffect(() => {
        styleBody('#fff'); // Вызов функции для изменения стилей страницы при монтировании
    }, []);

    const courseData = courses.find(course => course.nameEN === id); // Поиск соответствующего курса

    const handleModalClick = () => {
        setIsOpenModalNext(!isOpenModalNext); // Обработчик клика по кнопке "Начать тренировку"
    };

    return (
        <div className={styles.course__page}>
            <div className={styles.course__page_logo}>
                <BlackLogo />
                <Burger />
            </div>
            {courseData && (
                <div>
                    <div className={styles.course__page_image}>
                        <img src={courseData.ab1c3f} alt="ab1c3f" />
                    </div>
                    <div className={styles.center_text}>
                        <h2>Подойдет для вас, если:</h2>
                        <div className={styles.course__ioga_image}>
                            <img src={courseData.purposes} alt="purposes" />
                        </div>
                    </div>
                    <div className={styles.course__directions_text}>
                        <h2>Направления</h2>
                        <div className={styles.course__directions_image}>
                            <img src={courseData.iogaNaw} alt="iogaNaw" />
                            <img src={courseData.iogaNew} alt="iogaNew" />
                        </div>
                    </div>
                    <div className={styles.course__directions_info}>
                        <img src={courseData.info} alt="info" />
                    </div>
                    <div className={styles.info_block}>
                        <h2 className={styles.info_text}>
                            <img src={courseData.info_button} alt="info_button" />
                        </h2>
                        <div className={styles.button}>
                            {userIsRegistered ? ( // Проверка зарегистрирован ли пользователь
                                <button className={styles.button_text} onClick={handleModalClick}>
                                    Начать тренировку
                                </button>
                            ) : (
                                <a href="/Auth" className={styles.button_text}>
                                    Записаться на тренировку
                                </a>
                            )}
                        </div>
                        <div className={styles.info_image}>
                            <img src={courseData.buttonImage} alt="buttonImage" />
                        </div>
                    </div>
                    <Modal isOpenModalNext={isOpenModalNext} handleModalClick={handleModalClick} selectedTraining={courseData} />
                    {/* Рендер модального окна */}
                </div>
            )}
        </div>
    );
}
