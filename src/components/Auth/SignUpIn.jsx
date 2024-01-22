import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set } from 'firebase/database'
import { auth } from '../../firebase_auth'
import styles from './authorization.module.css'
import logo from '../../img/logo_auth.png'
import styleBody from '../../styleBody'
import { getAllUsers } from '../../api'
import { setCurrentUser } from '../../store/sliceStore'

export default function SignUpIn() {
  const dispatch = useDispatch()
  const [registrationRegime, setRegistrationRegime] = useState(false)
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('')
  const [error, setError] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [placeholderLogin, setPlaseholderLogin] = useState('Логин')
  const navigate = useNavigate()

  useEffect(() => {
    styleBody('#271A58')
  }, [])

  const disableButton = () => {
    setButtonDisabled(true)
  }

  function writeUserData(userId, name, email, imageUrl, id) {
    const db = getDatabase()
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
      id: id,
    })
  }

  function userLogin() {
    console.log('login')
    signInWithEmailAndPassword(auth, login, pass)
      .then((response) => {
        const currentUserArr = [...Object.values(response)]
        const currentUserUid = currentUserArr[0].uid
        dispatch(setCurrentUser(currentUserUid))
        localStorage.setItem('userUid', currentUserUid)

        // refresh = localStorage.getItem('refresh')
        navigate('/', { replace: true })
      })
      .catch((newError) => {
        setError(newError.message)
      })
  }

  function registration() {
    console.log('registration')
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
        const newUserArr = [...Object.values(response)]
        const newUserUid = newUserArr[0].uid
        dispatch(setCurrentUser(newUserUid))
        localStorage.setItem('userUid', newUserUid)

        return newUserArr
      })

      .then((responseNewUser) => {
        let id = []
        getAllUsers()
          .then((data) => {
            id = [...Object.values(data)]
            const uid = responseNewUser[0].uid
            console.log(...responseNewUser)
            const userId = uid
            const imageUrl = ''
            const name = responseNewUser[0].email
            const email = responseNewUser[0].email
            writeUserData(userId, name, email, imageUrl, id.length)
            navigate('/profile', { replace: true })
            return id
          })
          .catch((error) => setError(error.message))
      })

      .catch((newError) => {
        setError(newError.message)
        setButtonDisabled(false)
      })
  }
  return (
    <div className={styles.authorization__page}>
      <div className={styles.authorization__page_logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.authorization__page_inputs}>
        <input
          value={login}
          onChange={(e) => {
            setLogin(e.target.value)
            setButtonDisabled(false)
          }}
          className={styles.page_input}
          type="text"
          placeholder={placeholderLogin}
        />
        <input
          value={pass}
          onChange={(e) => {
            setPass(e.target.value)
            setButtonDisabled(false)
          }}
          className={styles.page_input}
          type="text"
          placeholder="Пароль"
        />
        <div
          className={
            registrationRegime === false ? styles.element__visibility : ''
          }
        >
          <input
            value={pass2}
            onChange={(e) => {
              setPass2(e.target.value)
              setButtonDisabled(false)
            }}
            className={styles.page_input}
            type="text"
            placeholder="Повторите пароль"
          />
        </div>
      </div>
      <div className={error === null ? styles.element__visibility : ''}>
        <div className={styles.error}>{error}</div>
      </div>
      <div className={styles.authorization__page_buttons}>
        <div
          className={
            registrationRegime !== false ? styles.element__visibility : ''
          }
        >
          <button
            onClick={() => {
              userLogin()
            }}
            type="button"
            className={styles.page__button_enter}
          >
            Войти
          </button>
        </div>
        <div className={buttonDisabled ? styles.button__disable : ''}>
          <button
            onClick={() => {
              if (registrationRegime) {
                disableButton()
                registration()
                setRegistrationRegime(true)
              } else {
                setRegistrationRegime(true)
              }
            }}
            type="button"
            className={
              registrationRegime
                ? styles.button__register_on
                : styles.page__button_register
            }
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  )
}
