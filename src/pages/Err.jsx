import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrPage() {
  return (<>
  
    <h1
      style={{
        position: 'absolute',
        left: '35%',
        top: '35%',
        fontFamily: 'StratosSkyeng',
        color: 'GrayText',
      }}
    >
      ERROR 404: Страница не найдена
    </h1>
    
    
    <Link to='/'
    style={{
      position: 'absolute',
      left: '47%',
      top: '50%',
      fontFamily: 'StratosSkyeng',
      textDecoration:'underline'
    }}
    > На главную</Link>
    
    
    </>
  )
}
