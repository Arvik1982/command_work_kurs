import logo from '../img/logo.svg'
import courseImg from '../img/skill card 17.png'
import purposes from '../img/Group 48096488.png'
import iogaNaw from '../img/iogaNaw.png'
import iogaNew from '../img/iogaNew.png'
import info from '../img/info.png'
import buttonImage from '../img/Group 48096487.svg'
import styles from './css/ioga.module.css'

export default function DescriptionPage() {
    return (
        <div className={styles.course__page}>
            <div className={styles.course__page_logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.course__page_image}>
                <img src={courseImg} alt="courseimage" />
            </div>
            <div className={styles.centr_text}>
                <h2>Подойдет для вас, если:</h2>
                <div className={styles.course__ioga_image}>
                    <img src={purposes} alt="purposes" />
                </div>
            </div>
            <div>
                <h2>Направления</h2>
                <div className={styles.course__directions_image}>
                    <img src={iogaNaw} alt="iogaNaw" />
                    <img src={iogaNew} alt="iogaNew" />
                </div>
                
            </div>
            <div>
                <img src={info} alt="info" />
            </div>
            <div>
                <div>
                    <h2>
                        Оставьте заявку на пробное занятие, мы свяжемся с вами, поможем с выбором направления и тренера, с которым тренировки принесут здоровье и радость!
                    </h2>
                    <div>
                        <img src={buttonImage} alt="buttonImage" />
                    </div>
                </div>
                <div className='button' >
                    <button type='button' className='button'>Записаться на тренировку</button>
                </div>
            </div>
        </div>
    )
}