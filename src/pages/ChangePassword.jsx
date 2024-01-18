import { useState } from 'react';
import styles from'./../components/Auth/authorization.module.css';
import logo from '../img/logo_auth.png'


export default function ChangePasswordPage(){
     const [changeElement, setChangeElement]=useState('login')

    
     return(
    
        changeElement==='login'?  
        <div className={styles.authorization__page}>
    
        <div className={styles.authorization__page_logo}>
        <img src={logo} alt="logo" />
        </div>
        
        <div className={styles.authorization__page_inputs}>
        <h4 className={styles.page__inputs_header}>Новый логин:</h4>
            <input className={styles.page_input} type="text" placeholder='Логин' />
        </div>
        <div className={styles.authorization__page_buttons}>
                <button onClick={changeElement==='login'?()=>setChangeElement('pass'):()=>setChangeElement('login')} 
                type='button' className={styles.page__button_enter}>Сохранить</button>
        </div>
</div>:
        <div className={styles.authorization__page}>
    
        <div className={styles.authorization__page_logo}>
        <img src={logo} alt="logo" />
        </div>

        <div className={styles.authorization__page_inputs}>
        <h4 className={styles.page__inputs_header}>Новый пароль:</h4>
        <input className={styles.page_input} type="text" placeholder='Пароль' />
        <input className={styles.page_input} type="text" placeholder='Повторите пароль' />
        </div>
        <div className={styles.authorization__page_buttons}>
        <button onClick={changeElement==='login'?()=>setChangeElement('pass'):()=>setChangeElement('login')} 
        type='button' className={styles.page__button_enter}>Сохранить</button>
    </div>
    
</div>
    
    )
}