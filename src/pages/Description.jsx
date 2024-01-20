import {useEffect, useState} from "react";
import getAllCourses from "../api";
// import logo from '../img/logo.svg'
import courseImg from '../img/skill card 17.png'
// import purposes from '../img/Group 48096488.png'
// import iogaNaw from '../img/iogaNaw.png'
// import iogaNew from '../img/iogaNew.png'
import info from '../img/info.png'
import buttonImage from '../img/Group 48096487.svg'
import styles from './css/yoga.module.css'




import styleBody from "../styleBody";
// import WhiteLogo from "../components/Logo/whiteLogo";
import BlackLogo from "../components/Logo/BlackLogo";

export default function DescriptionPage() {

    const [trainingsArray, setTrainingsArray]=useState([])
    
    const setPage =(arr)=>{setTrainingsArray(arr)}
    let currentCourse =[]
    
    useEffect(() => {
        
    getAllCourses().then((data)=>{
        const arr = [...Object.values(data)]
        setPage(arr)
        currentCourse=arr
        console.log(trainingsArray)
        console.log(data)
        const StepAirobic = currentCourse[0]
        console.log(StepAirobic)
        console.log(StepAirobic.description)
        console.log(StepAirobic.fitting)
        return data})

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

                    <div>text: FITTING </div>

                </div>
            </div>
            <div>
                <h2>Направления</h2>

                <div className={styles.course__directions_image}>
                    
                    <div>text: DIRECTIONS - map.array </div>
                    
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
