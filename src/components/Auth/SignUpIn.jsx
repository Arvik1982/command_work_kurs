import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase_auth';
import styles from './authorization.module.css';
import logo from '../../img/logo_auth.png'
import styleBody from "../../styleBody";

export default function SignUpIn() {

    const [registrationRegime, setRegistrationRegime] = useState(false)

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [error, setError] = useState(null)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [placeholderLogin, setPlaseholderLogin] = useState('Логин')

    const disableButton = () => {
        setButtonDisabled(true)

    }

    function registration() {
        if (pass !== pass2) {
            setError('Пароли не совпадают')
            return
        }
        if (login === '') {

            setPlaseholderLogin('Введите логин')
            setError('Введите логин')
            return
        }
        if (pass === '') {
            setPlaseholderLogin('Введите пароль')
            setError('Введите пароль')
            return
        }
        createUserWithEmailAndPassword(auth, login, pass)
            .then((response) => {
                setError(null)
                setButtonDisabled(false)
                console.log(response)
            })
            .catch((newError) => {
                setError(newError.message)
                setButtonDisabled(false)
            })
    }
    useEffect(() => {
        styleBody('#271A58')
    }, [])

    return (<div className={styles.authorization__page}>

        <div className={styles.authorization__page_logo}>
            <img src={logo} alt="logo" />
        </div>
        <div className={styles.authorization__page_inputs}>
            <input value={login} onChange={(e) => { setLogin(e.target.value); setButtonDisabled(false) }} className={styles.page_input} type="text" placeholder={placeholderLogin} />

            <input value={pass} onChange={(e) => { setPass(e.target.value); setButtonDisabled(false) }} className={styles.page_input} type="text" placeholder='Пароль' />

            <div className={registrationRegime === false ? styles.element__visibility : ''} >
                <input value={pass2} onChange={(e) => { setPass2(e.target.value); setButtonDisabled(false) }} className={styles.page_input} type="text" placeholder='Повторите пароль' />
            </div>
        </div>
        <div className={error === null ? styles.element__visibility : ''}>
            <div className={styles.error}>{error}</div>
        </div>
        <div className={styles.authorization__page_buttons}>
            <div className={registrationRegime !== false ? styles.element__visibility : ''} >
                <button onClick={() => { }} type='button' className={styles.page__button_enter}>Войти</button>
            </div>
            <div className={(buttonDisabled) ? styles.button__disable : ''}>
                <button onClick={() => {
                    if (registrationRegime) {
                        disableButton()
                        registration()
                        setRegistrationRegime(true);
                    }
                    else { setRegistrationRegime(true) }
                }} type='button'
                    className={registrationRegime ? styles.button__register_on : styles.page__button_register}>Зарегистрироваться</button>
            </div>
        </div>
    </div>)
}