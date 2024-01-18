import { useState } from 'react';
import styles from'./authorization.module.css';
import logo from './../../img/logo_auth.png'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase_auth';


export default function SignUpIn(){

const [registrationRegime, setRegistrationRegime]=useState(false)

const [login, setLogin]=useState('')
const [pass, setPass]=useState('')
const [pass2, setPass2]=useState('')
const [error,setError]=useState('')

function registration (){
if(pass!==pass2) {
    setError('pass incorrect')
    return
}
createUserWithEmailAndPassword(auth, login, pass)
.then((user)=>{console.log(user)})
}




  return( <div className={styles.authorization__page}>
    
    <div className={styles.authorization__page_logo}>
    <img src={logo} alt="logo" />
    </div>
    <div className={styles.authorization__page_inputs}>
        <input value={login} onChange={(e)=>setLogin(e.target.value)} className={styles.page_input} type="text" placeholder='Логин' />

        <input value={pass} onChange={(e)=>setPass(e.target.value)} className={styles.page_input} type="text" placeholder='Пароль'/>

        <div className={registrationRegime===false?styles.element__visibility:''} >
        <input value={pass2} onChange={(e)=>setPass2(e.target.value)} className={styles.page_input} type="text" placeholder='Повторите пароль'/>
        </div>
    </div>
    <div className={styles.authorization__page_buttons}>
    <div className={registrationRegime!==false?styles.element__visibility:''} >
        <button onClick={()=>registration()} type='button' className={styles.page__button_enter}>Войти</button>
    </div>
        <button  onClick={()=>{

            setRegistrationRegime(true);
            
            }} type='button' className={registrationRegime?styles.button__register_on:styles.page__button_register}>Зарегистрироваться</button>
    </div>

</div>)


}