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
  const [placeholderLogin, setPlaseholderLogin] = useState(
    'Логин: mail@email.com',
  )
  const navigate = useNavigate()
  const errTextLogin = 'Firebase: Error (auth/invalid-email).'
  const errTextNoUser = 'Firebase: Error (auth/user-not-found).'
  const errTextNoPass = 'Firebase: Error (auth/missing-password).'
  const errTextPassLenght =
    'Firebase: Password should be at least 6 characters (auth/weak-password).'
  const wrongPass = 'Firebase: Error (auth/wrong-password).'
  const loginInUse = 'Firebase: Error (auth/email-already-in-use).'
  const netError='Firebase: Error (auth/network-request-failed).'

  useEffect(() => {
    styleBody('#271A58')
  }, [])

  const disableButton = () => {
    setButtonDisabled(true)
  }

  function writeUserData(userId, name, email, imageUrl, id, progress) {
    const db = getDatabase()
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
      id: id,
      progress: progress,
    })
   
  }
// Изменение данных пользователя, запись прогресса 
  function changeUserData(userId,name, email, imageUrl, id, yogProgr,strProgr,stpProgr,bodProgr,danProgr ) {
    const db = getDatabase();

    userId ='LDw9y1jPRRSv3NbNLB1AK4SANf52'
    name ='02022024test@test.ru'
    email = name
    imageUrl='url'
    id ='18'
    yogProgr=[3,0,1,0,0,7]

    let progress={
      yoga: yogProgr ,
      stratch:strProgr?strProgr:0,
      step: stpProgr?stpProgr:0,
      body: bodProgr?bodProgr:0,
      dance: danProgr?danProgr:0,
    }
    set(ref(db, 'users/' + userId ), {
      username: name,
      email: email,
      profile_picture: imageUrl,
      id: id,
      progress: progress,
    });

    // <button onClick={()=>{changeUserData()}}>click</button>
  }

  function userLogin() {
    console.log('login')
    signInWithEmailAndPassword(auth, login, pass)
      .then((response) => {
        const currentUserArr = [...Object.values(response)]
        const currentUserUid = currentUserArr[0].uid
        dispatch(setCurrentUser(currentUserUid))
        localStorage.setItem('userUid', currentUserUid)
        return currentUserArr
      })
      .then(() => {
        navigate('/profile', { replace: true })
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
        navigate('/profile', { replace: true })
        return newUserArr
      })

      .then((responseNewUser) => {
        let id = []
        let progress = []
        getAllUsers()
          .then((data) => {
            id = [...Object.values(data)]
            progress = {
              yoga: [0,0,0,0,0,0],
              stratch: 0,
              step: 0,
              body: 0,
              dance: 0,
            }
            const uid = responseNewUser[0].uid
            const userId = uid
            const imageUrl = ''
            const name = responseNewUser[0].email
            const email = responseNewUser[0].email
            writeUserData(userId, name, email, imageUrl, id.length, progress)
            navigate('/profile', { replace: true })
            return id
          })
          .catch((newError) => setError(newError.message))
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
          placeholder="Пароль (не менее 6 символов)"
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
        <div className={styles.error}>
          {error === errTextLogin
            ? 'Формат логина не соответствует email mail@email.com'
            : error === errTextNoUser
              ? 'Пользователь с таким логином не найден'
              : error === errTextNoPass
                ? 'Введите пароль'
                : error === errTextPassLenght
                  ? 'Пароль должен быть не меньше 6 символов'
                  : error === wrongPass
                    ? 'Неверный пароль'
                    : error === loginInUse
                      ? 'Пользователь уже зарегистрирован'
                      : error===netError?'Нет подключения к сети':error}
        </div>
      </div>
      <div className={styles.authorization__page_buttons}>
        <div
          className={
            registrationRegime !== false ? styles.element__visibility : ''
          }
        >
          <button
            onKeyDown={(e) => {
              if (e === 'Enter') userLogin()
            }}
            onClick={() => {
              userLogin()
              localStorage.setItem('userLogin', login)
              localStorage.setItem('userPass', pass)
            }}
            type="button"
            className={styles.page__button_enter}
          >
            Войти
          </button>
        </div>
        <div className={buttonDisabled ? styles.button__disable : ''}>
          <button
            onKeyDown={(e) => {
              if (e === 'Enter') registration()
            }}
            onClick={() => {
              if (registrationRegime) {
                disableButton()
                registration()
                setRegistrationRegime(true)
                localStorage.setItem('userLogin', login)
                localStorage.setItem('userPass', pass)
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
