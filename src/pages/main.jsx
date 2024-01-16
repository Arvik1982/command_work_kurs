import { Link } from 'react-router-dom';
import './css/main.css';
import { useEffect, useState } from 'react';
//  redux
import { useSelector } from "react-redux";
// 

import { getAllCourses } from '../api';

import logo from '../img/logo.png'
import sale from'../img/Sale sticker.png'

export default function MainPage(){


const [trainingsArray, setTrainingsArray]=useState([])  

    useEffect(()=>{
        getAllCourses().then((data)=>{
        const arr = [...Object.values(data)]
        setTrainingsArray(arr)
        return data
      })},[])

    const testData = useSelector(state=>state.store.testData)

    return(<>
    <header className='main__header'>
     <div className='main__header_left'>
        <img src={logo} alt="logo" />
        <h3 className='main__description'>Онлайн-тренировки для занятий дома</h3>
        <h2 className='main__title'>Начните заниматься спортом и улучшите качество жизни</h2>
    </div>
    <div className='main__header_right'>
        <Link to='/auth'>
        <button type='button' className='main__header_button'>вoйти</button>
        </Link>
        <img src={sale} alt="sale" />
    </div>
    </header>
    <div className='main__trainings_grid'>
        {
        
        trainingsArray.map(el=>{return <Link to='/description'>
        <div key={el.nameEN} 
            
        className={ 
            el.nameEN ==='StepAirobic'?'grid__element_step':
            el.nameEN === 'Yoga'? 'grid__element_yoga':
            el.nameEN === 'Stretching'? 'grid__element_stretch':
            el.nameEN === 'BodyFlex'? 'grid__element_body':
            el.nameEN === 'DanceFitness'? 'grid__element_dance':
            'trainings__grid_element'
            }
            >
            
        
          {/* <h2 className='grid__element_name'>{el.nameEN}</h2> */}
        
    </div>
    </Link> 
 })}
            
<div  className='trainings__grid_element'>{testData}</div>
    </div>
<div className='main__footer'>
    <button type='button' className='main__footer_button'>Наверх ↑</button>
</div>
    </>
    )
}