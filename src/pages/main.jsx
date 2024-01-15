import './css/main.css';
import { useEffect } from 'react';
//  redux
import { useSelector } from "react-redux";
// 
import logo from '../img/logo.png'
import sale from'../img/Sale sticker.png'
import { getAllCourses } from '../api';



export default function MainPage()

{
    


    useEffect(()=>{
        getAllCourses().then((data)=>{
        
             console.log(data)
             return data
      })},[])



    
    const testData = useSelector(state=>state.store.testData)

    const trainingsArr =[
        {name:"Йога"},
        {name:"Стретчинг"},
        {name:"Танцевальный фитнес"},
        {name:"Степ-аэробика"},
        {name:"Бодифлекс"},
    ]

    return(<>
    <header className='main__header'>
     <div className='main__header_left'>
        <img src={logo} alt="logo" />
        <h3 className='main__description'>Онлайн-тренировки для занятий дома</h3>
        <h2 className='main__title'>Начните заниматься спортом и улучшите качество жизни</h2>
    </div>
    <div className='main__header_right'>
        <button type='button' className='main__header_button'>вoйти</button>
        <img src={sale} alt="sale" />
    </div>
    </header>
    <div className='main__trainings_grid'>
        {trainingsArr.map(el=>{return <div key={el.name} 
        className='trainings__grid_element'>
          <h2 className='grid__element_name'>{el.name}</h2>  
    </div>})}
            
<div  className='trainings__grid_element'>{testData}</div>
    </div>
<div className='main__footer'>
    <button type='button' className='main__footer_button'>Наверх ↑</button>
</div>
    </>
    )
}