import { useState } from 'react';
import './css/authorization.css';
import logo from '../img/logo_auth.png'


export default function AuthorizationPage(){
    const [registrationRegime, setRegistrationRegime]=useState(false)

    

    return(
        <div className="authorization__page">
    
        <div className='authorization__page_logo'>
        <img src={logo} alt="logo" />
        </div>
        <div className='authorization__page_inputs'>
            <input className='page_input' type="text" placeholder='Логин' />

            <input className='page_input' type="text" placeholder='Пароль'/>

            <div className={registrationRegime===false?'element__visibility':''} >
            <input className='page_input' type="text" placeholder='Повторите пароль'/>
            </div>
        </div>
        <div className='authorization__page_buttons'>
        <div className={registrationRegime!==false?'element__visibility':''} >
            <button type='button' className='page__button_enter'>Войти</button>
        </div>
            <button onClick={()=>{setRegistrationRegime(true)}} type='button' className={registrationRegime?'button__register_on':'page__button_register'}>Зарегистрироваться</button>
        </div>

    </div>

    
    )
}