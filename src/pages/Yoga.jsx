
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styleBody from "../styleBody";
import BlackLogo from "../components/Logo/BlackLogo";
import Fon from "../img/Group 48096400.svg"
import Fon1 from "../img/Subtract.svg"
import one from "../img/1.png"
import two from "../img/2.png"
import ofre from "../img/3.png"
import styles from './css/ioga.module.css';
import Burger from '../components/Burger';

import buttonImage from '../img/Group 48096487.svg';
import info from '../img/info.png';
import info_button from '../img/info_button.svg'


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
                        <img src={Fon1} alt="Fon" />
                        <div className={styles.imagetext}>
                        <h2>{courseData.nameRU}</h2>
                        </div>
                    </div>
                    <div className={styles.center_text}>
                        <h2>Подойдет для вас, если:</h2>
                        <div className={styles.course__ioga_image}>
                            <div className={styles.course__ioga}>
                                <img src={one} alt="one" className={styles.yourImageClass}/>
                                <h3>{courseData.fitting[0]}</h3>
                            </div>
                            <div className={styles.course__ioga}>
                                <img src={two} alt="two" className={styles.yourImageClass}/>
                                <h3>{courseData.fitting[1]}</h3>
                            </div>
                            <div className={styles.course__ioga}>
                                <img src={ofre} alt="ofre" className={styles.yourImageClass}/>
                                <h3>{courseData.fitting[2]}</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.course__directions_text}>
                        <h2>Направления</h2>
                        <div className={styles.course__directions_image}>
                            <ul className={styles.spisock}>
                                <li>{courseData.directions[0]}</li>
                                <li>{courseData.directions[1]}</li>
                                <li>{courseData.directions[2]}</li>
                            </ul>

                            <ul className={styles.spisock}>
                                <li>{courseData.directions[3]}</li>
                                <li>{courseData.directions[4]}</li>
                                <li>{courseData.directions[5]}</li>
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
                            <img src={buttonImage} alt="buttonImage" />
                        </div>
                    </div>
                    <Modal isOpenModalNext={isOpenModalNext} handleModalClick={handleModalClick} selectedTraining={courseData} 
                    trainingsArray={courses} />
                    {/* Рендер модального окна */}
                </div>
            )}
        </div>
    );
}
