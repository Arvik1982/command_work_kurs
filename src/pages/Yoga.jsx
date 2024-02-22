
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import MyProfile from './Myprofile'
import styleBody from "../styleBody";
import BlackLogo from "../components/Logo/BlackLogo";
import Fon1 from "../img/Subtract.svg"
import one from "../img/1.png"
import two from "../img/2.png"
import ofre from "../img/3.png"
import styles from './css/ioga.module.css';
import Burger from '../components/Burger';
import buttonImage from '../img/Group 48096487.svg';
import info from '../img/info.png';
import info_button from '../img/info_button.svg'
import { getMyCourses } from '../api';
import { postCourseNoProgress } from '../api';
import Modal from '../components/Modal/ModalCourse';


export default function DescriptionPage() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isOpenModalNext, setIsOpenModalNext] = useState(false);
    const { id } = useParams();
    const courses = useSelector(state => state.store.trainingsArray);
    const userIsRegistered = localStorage.getItem('userUid');
    const [currentUser] = useState({ email: localStorage.getItem('userLogin') });
    const [trainingsArray, setTrainingsArray] = useState([]);
    const courseData = courses.find(course => course.nameEN === id);
    const navigate = useNavigate();
    const [isRegisterButtonVisible, setIsRegisterButtonVisible] = useState(true);

    const handleAuthRedirect = () => {
        navigate('/Auth');
    };

    const handleCourseButtonClick = () => {
    if (!userIsRegistered) {
        handleAuthRedirect();
    } else {
        if (!isOpenModalNext) {
            postCourseNoProgress(courseData.nameEN);
            setIsSubscribed(true); // Устанавливаем флаг подписки
            setIsRegisterButtonVisible(false); // Скрываем кнопку записи на тренировку
            alert("Вы успешно записались на тренировку!"); // Выводим алерт
        } else {
            setIsOpenModalNext(false); // Закрываем модальное окно
        }
    }
};
    

    const handleToTraining = () => {
        setIsOpenModalNext(true);
    };

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    const handleClickOutside = (event) => {
        if (isOpenModalNext && !event.target.closest(`.${styles.modal}`)) {
            setIsOpenModalNext(false);
        }
    };

    useEffect(() => {
        styleBody('#fff'); // Вызов функции для изменения стилей страницы при монтировании
    }, []);
    // Обновление текста кнопки после записи на курс
    useEffect(() => {
        if (userIsRegistered) {
            setIsOpenModalNext(false); // Закрываем модальное окно
        }
    }, [userIsRegistered]);


    // Получение прогресса (АПИ)
    useEffect(() => {
        styleBody('#FAFAFA');
        const uid = localStorage.getItem('userUid');
        const fetchData = async () => {
            try {
                const data = await getMyCourses(uid);
                console.log(data)
                if ('course' in data) {
                    setTrainingsArray(data.course);
                    console.log(data.course)
                } else {
                    setTrainingsArray([0]);
                }
            } catch (error) {
                alert(error)
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        styleBody('#fff'); // Вызов функции для изменения стилей страницы при монтировании
    }, []);
    // Получение прогресса (АПИ)
    useEffect(() => {
        styleBody('#FAFAFA');
        const uid = localStorage.getItem('userUid');
        const fetchData = async () => {
            try {
                const data = await getMyCourses(uid);
                console.log(data)
                if ('course' in data) {
                    setTrainingsArray(data.course);
                    console.log(data.course)
                } else {
                    setTrainingsArray([0]);
                }
            } catch (error) {
                alert(error)
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.course__page} onClick={handleClickOutside}>
            <div className={styles.course__page_logo}>
                <BlackLogo />
                <Burger currentUser={currentUser} />
            </div>
            {courseData && (
                <div>
                    <div className={styles.course__page_image}>
                        <img src={Fon1} alt="Fon" />
                        <div className={styles.imagetext}>
                            <h2>{courseData.nameRU}</h2>
                        </div>
                    </div>
                    <div className={styles.center_text}>
                        <h2>Подойдет для вас, если:</h2>

                        <div className={styles.course__ioga_image}>
                            <div className={styles.course__ioga}>
                                <img src={one} alt="one" className={styles.yourImageClass} />
                                <h3 className={styles.course__ioga_text}>{courseData.fitting[0]}</h3>
                            </div>

                            <div className={styles.course__ioga}>
                                <img src={two} alt="two" className={styles.yourImageClass} />
                                <h3 className={styles.course__ioga_text}>{courseData.fitting[1]}</h3>
                            </div>

                            <div className={styles.course__ioga}>
                                <img src={ofre} alt="ofre" className={styles.yourImageClass} />
                                <h3 className={styles.course__ioga_text}>{courseData.fitting[2]}</h3>
                            </div>
                        </div>

                    </div>
                    <div className={styles.course__directions_text}>
                        <h2>Направления</h2>
                        <div className={styles.course__directions_image}>
                            <ul className={`${styles.spisock} ${courseData.directions.length > 3 ? styles.largeList : ''}`}>
                                {courseData.directions.map((direction, index) => {
                                    return (
                                        <li key={index}>{direction}</li>
                                    )
                                })}
                            </ul>
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
                {isRegisterButtonVisible && !isSubscribed && (
                    <button className={styles.button_text} onClick={() => handleCourseButtonClick(navigate)}>
                        Записаться на тренировку
                    </button>
                )}

                {!isRegisterButtonVisible && 
                    <button className={styles.button_text} onClick={handleToTraining}>
                        Начать тренировку
                    </button>
        }
    </div>
                        <div className={styles.info_image}>
                            <img src={buttonImage} alt="buttonImage" />
                        </div>
                    </div>
                    <Modal isOpenModalNext={isOpenModalNext} handleModalClick={handleModalClick}
                        trainingsArray={trainingsArray} />
                    {/* Рендер модального окна */}
                </div>
            )}
        </div>
    );
}
