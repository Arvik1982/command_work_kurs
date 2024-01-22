import  { useEffect } from 'react';
import courseImg from '../img/skill card 17.png'
import purposes from '../img/Group 48096488.png'
import iogaNaw from '../img/iogaNaw.png'
import iogaNew from '../img/iogaNew.png'
import info from '../img/info.png'
import buttonImage from '../img/Group 48096487.svg'
import styles from './css/ioga.module.css'
import styleBody from "../styleBody";

import BlackLogo from "../components/Logo/BlackLogo";

export default function DescriptionPage() {
    useEffect(() => {
        styleBody('#fff')
    }, []);
    return (
        <div className={styles.course__page}>
            <div className={styles.course__page_logo}>
                <BlackLogo/>
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
            <div>
                <div className={styles.info}>
                    <h2 className={styles.info_text}>
                        Оставьте заявку на пробное занятие, мы свяжемся с вами, поможем с выбором направления и тренера, с которым тренировки принесут здоровье и радость!
                    </h2>
                    <div className={styles.info_image}>
                        <img src={buttonImage} alt="buttonImage" />
                    </div>
                </div>
                <div className={styles.button} >
                    <button type='button' className={styles.button_text}>Записаться на тренировку</button>
                </div>
            </div>
        </div>
    )
}