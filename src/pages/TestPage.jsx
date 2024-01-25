import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styleBody from "../styleBody";
import BlackLogo from "../components/Logo/BlackLogo";
import courseImg from '../img/skill card 17.png';
import purposes from '../img/Group 48096488.png';
import iogaNaw from '../img/iogaNaw.png';
import iogaNew from '../img/iogaNew.png';
import info from '../img/info.png';
import buttonImage from '../img/Group 48096487.svg';
import styles from './css/ioga.module.css';
import { useSelector } from 'react-redux';
import { getAllCourses } from '../api';
import { compose } from '@reduxjs/toolkit';

export default function TestPage() {


    // const trainingsArray = useSelector(state=>state.store.trainingsArray)
    const courseName = 'DanceFitness' // useSelector(state=>state.store.courseName)
    const [trainingsArray,setTrainingsArray]=useState([])
    console.log(trainingsArray)
   
    useEffect(() => {
        styleBody('#fff')
        getAllCourses().then((data)=>{
            const array = [...Object.values(data)]
            return array
        }).then((array)=>{
        if(courseName==='StepAirobic'){setTrainingsArray(array[0])}
        if(courseName==='Yoga'){setTrainingsArray(array[1])}
        if(courseName==='Stretching'){setTrainingsArray(array[2])}
        if(courseName==='BodyFlex'){setTrainingsArray(array[3])}
        if(courseName==='DanceFitness'){setTrainingsArray(array[4])}
    
    })
    }, []);
    return (
        <div className={styles.course__page}>
{
console.log(trainingsArray)}
            <h1>{trainingsArray.nameEN}</h1>
            {/* <div className={styles.course__page_logo}>
                <BlackLogo />
            </div>
            <div className={styles.course__page_image}>
            {console.log(trainingsArray)}
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
                    Оставьте заявку на пробное занятие, мы свяжемся с вами, поможем с выбором направления и тренера, с которым тренировки принесут здоровье и радость!
                </h2>
                <div className={styles.button}>
                    <Link to="/SignUpIn" className={styles.button_text}>
                        Записаться на тренировку
                    </Link>
                </div>
                <div className={styles.info_image}>
                    <img src={buttonImage} alt="buttonImage" />
                </div>

            </div> */}
        </div>
    )
}