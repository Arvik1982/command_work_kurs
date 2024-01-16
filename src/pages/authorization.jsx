import { useState } from 'react';
import styles from'./css/authorization.module.css';
import logo from '../img/logo_auth.png'


export default function AuthorizationPage(){
    const [registrationRegime, setRegistrationRegime]=useState(false)

    

    return(
        <div className={styles.authorization__page}>
    
        <div className={styles.authorization__page_logo}>
        <img src={logo} alt="logo" />
        </div>
        <div className={styles.authorization__page_inputs}>
            <input className={styles.page_input} type="text" placeholder='Логин' />

            <input className={styles.page_input} type="text" placeholder='Пароль'/>

            <div className={registrationRegime===false?styles.element__visibility:''} >
            <input className={styles.page_input} type="text" placeholder='Повторите пароль'/>
            </div>
        </div>
        <div className={styles.authorization__page_buttons}>
        <div className={registrationRegime!==false?styles.element__visibility:''} >
            <button type='button' className={styles.page__button_enter}>Войти</button>
        </div>
            <button onClick={()=>{setRegistrationRegime(true)}} type='button' className={registrationRegime?styles.button__register_on:styles.page__button_register}>Зарегистрироваться</button>
        </div>

    </div>

    
    )
}