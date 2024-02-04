import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateEmail } from 'firebase/auth';
import { auth } from '../firebase_auth';
import { getAllCourses, getMyCourses } from '../api';
import { setCourseName } from '../store/sliceStore';
import styles from './css/myprofile.module.css';
import logo from '../img/logo.svg';
import BlackLogo from '../components/Logo/BlackLogo';
import yoga from '../img/img_profile/yoga_profile.png';
import stretch from '../img/img_profile/stretch_profile.png';
import body from '../img/img_profile/bodyflex_profile.png';
import styleBody from '../styleBody';
import close from '../img/img_profile/close.png';
import open from '../img/img_profile/open.png';
import Modal from '../components/Modal/ModalCourse';
import Burger from '../components/Burger';
import { Link } from 'react-router-dom';

export default function MyProfilePage() {
  const dispatch = useDispatch();
  // Стейт для отображения модального окна №1
  const [showModal, setShowModal] = useState(false);
  // Стейт для отображения модального окна №2
  const [showModalTwo, setShowModalTwo] = useState(false);
  // Стейт для получения курсов
  const [trainingsArray, setTrainingsArray] = useState([]);
  // Стейт для хранения ошибок
  const [error, setError] = useState('');
  // Стейт отправки запроса на смену пароля
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  // Стейт отправки запроса на смену логина
  const [isSavingLogin, setIsSavingLogin] = useState(false);
   // Стейт для хранения информации о текущем пользователе
  const [currentUser, setCurrentUser] = useState(null);
  // Стейт для кнопки "Перейти"
  const [isOpenModalNext, setIsOpenModalNext] = useState(false);
  // Стейт для показа пароля
  const [showPassword, setShowPassword] = useState(true);
  // Стейт для уведомления
  const [showNotification, setShowNotification] = useState(false);
  // Функция клика по кнопке "Перейти"
  const handleToTraining = (trainingType) => {
    console.log(trainingType)
    dispatch(setCourseName(trainingType))
    setIsOpenModalNext(true);
  };
  // Функция клика по кнопке "Смена логина"
  const handleEditLoginClick = () => {
    setShowModal(true);
    setError('');
  };
  // Функция клика по кнопке "Смена пароля"
  const handleEditLoginClickTwo = () => {
    setShowModalTwo(true);
    setError('');
  };
  // Функция для изоляции
  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  // Функция для закрытия модального окна
  const handleClickOutside = (event) => {
    if ((showModal || showModalTwo ||isOpenModalNext) && !event.target.closest(`.${styles.modal}`)) {
      setShowModal(false);
      setShowModalTwo(false);
      setIsOpenModalNext(false);
    }
  };
  // Сохранение пароля (АПИ) обновляется в БД
  const handleSavePasswordClick = () => {
    const password = document.getElementById('password').value;
    const newPassword = document.getElementById('newpassword').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const storedPassword = localStorage.getItem('userPass');
    const user = auth.currentUser;
    const email = user.email;
    const errors = [];
    const cred = EmailAuthProvider.credential(
      email,
      password
    );
    switch(true) {
      case password !== storedPassword:
        errors.push('Неверный пароль!');
        break;
      case(!newPassword.length || !repeatPassword.length || !password):
      errors.push('Заполните все поля ввода');
      break;
      case(newPassword.length < 6 || repeatPassword.length < 6):
      errors.push('Слишком короткий пароль');
      break;
      case(newPassword !== repeatPassword):
      errors.push('Ваши пароли не совпадают');
      break;
      default:
        setError('');
        setIsSavingPassword(true);
        reauthenticateWithCredential(user, cred).then(() => {
          console.log('Вы вошли в систему')
          updatePassword(user, newPassword).then(() => {
            console.log('Ваш пароль обновлен')
            setIsSavingPassword(false);
            setShowModalTwo(false);
            setCurrentUser({ email: user.email, password: newPassword });
            localStorage.setItem('userLogin', user.email);
            localStorage.setItem('userPass', newPassword);
            // Логин успешно обновлен в Firebase Authentication
          }).catch((err) => {
            if (err.response.status === 400) {
              errors.push('Ошибка 400: Неверный запрос');
              return;
            } else if (err.response.status === 404) {
              errors.push('Ошибка 404: Ресурс не найден');
              return;
            } else if (err.response.status === 500) {
              errors.push('Ошибка 500: Внутренняя ошибка сервера');
              return;
            } else {
              errors.push(`Необработанная ошибка: ${err.message}`);
              return;
            }
          })
        }).catch((err) => {
          errors.push(`Пожалуйста, повторите попытку позже!`);
          console.log(`${err.message}`);
          setIsSavingPassword(false);
          setError(errors.join(', '));
        });  
    }
    if (errors.length > 0) {
      setError(errors.join(', '));
    }
  };
  // Сохранение логина (АПИ) обновляется в БД
  const handleSaveLoginClick = () => {
    const newLogin = document.getElementById('username').value;
    const validUsername = /^[a-zA-Z][a-zA-Z0-9._@]*$/;
    const user = auth.currentUser;
    const email = user.email;
    const password = document.getElementById('password').value;
    const storedPassword = localStorage.getItem('userPass');
    const errors = [];
    const cred = EmailAuthProvider.credential(
      email,
      password
    );
    const localUser = user.uid;
    switch (true) {
      case password !== storedPassword:
        errors.push('Неверный пароль!');
        break;
      case !newLogin || !password:
        errors.push('Заполните все поля ввода');
        break;
      case !newLogin.match(validUsername):
        errors.push('Логин должен содержать только латинские буквы, цифры и не начинаться с дефиса или подчеркивания');
        break;
      default:
        // Сбрасываем ошибки, если они были ранее
        setError('');
        setIsSavingLogin(true);
        reauthenticateWithCredential(user, cred).then(() => {
          console.log('Вы вошли в систему');
          return updateEmail(user, newLogin);
        }).then(() => {
          return fetch(`https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/users/${localUser}.json`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ email: newLogin, username: newLogin }),
          });
        }).then(() => {
          const updatedUser = auth.currentUser;
          console.log('Новый email:', updatedUser.email);
          setIsSavingLogin(false);
          setCurrentUser({ email: updatedUser.email, password: password });
          setShowModal(false);
          localStorage.setItem('userLogin', user.email);
          localStorage.setItem('userPass', password);
        }).catch((err) => {
          if (err.message !== 'Server error') {
            errors.push(`Неверные данные!`);
          }
          console.log(`${err.message}`);
          setIsSavingLogin(false);
          setError(errors.join(', '));
        });
      }
    if (errors.length > 0) {
      setError(errors.join(', '));
    }
  };
  // Функция для обработки клика на изображении
  const handleImageClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  // Получение курсов (АПИ)
  useEffect(() => {
    styleBody('#FAFAFA')
    const uid = localStorage.getItem('userUid');
    getMyCourses(uid).then((data) => {
      const arr = [...Object.values(data)];
      console.log(arr);
      if (arr.length === 1) {
        setTrainingsArray([0]);
        setTimeout(() => {
          setShowNotification(true);
        }, 3000);
      } else {
        setTrainingsArray(arr);
      }
      return data;
    });
  }, []);
  // Получение информации о текущем пользователе при загрузке страницы
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUser({
        email: user.email,
      });
      // Сохранение электронной почты пользователя в локальное хранилище
      localStorage.setItem('userLogin', user.email);
    }
  }, []);
  useEffect(() => {
    const userEmailFromStorage = localStorage.getItem('userLogin');
    const userPasswordFromStorage = localStorage.getItem('userPass');
    if (userEmailFromStorage) {
      setCurrentUser({ email: userEmailFromStorage, password: userPasswordFromStorage });
    }
  }, []);

  return (
    <div className={styles.wrapper} onClick={handleClickOutside}>
      <div className={styles.header}>
        <BlackLogo route="/" />
        <Burger currentUser={currentUser} />
      </div>
      <div className={styles.header_bottom}>
        <div className={styles.header_bottom}>
          <span className={styles.header_title}>Мой профиль</span>
          <div className={styles.header_info}>
            <span className={styles.header_info_text}>Логин:</span>
            <span className={styles.header_info_login}>{currentUser?.email}</span>
          </div>
          <div className={styles.header_info}>
            <span className={styles.header_info_text}>Пароль:</span>
            <div className={styles.header_info_login}>
              <span>{showPassword ? '••••••' : currentUser?.password}</span>
              <img
                className={styles.header_img_eye}
                src={showPassword ? close : open}
                alt={showPassword ? 'close_password' : 'open_password'}
                onClick={handleImageClick}
              />
            </div>
          </div>
        </div>
        <button className={styles.header_button} onClick={handleEditLoginClick} type="submit">Редактировать логин</button>
        {showModal && (
        <form className={styles.modalOverlay}>
          <div className={styles.modal} onClick={handleModalClick}>
            {/* Содержимое модального окна */}
            <div className={styles.modalContent}>
              {/* ... (форма или другие элементы для редактирования логина) */}
              <img src={logo} alt="logo" />
              <div className={styles.main_info}>
                <span className={styles.main_text}>Текущий пароль:</span>
                <input className={styles.main_form} type="password" id="password" name="password" placeholder="Введите пароль" />
                <span className={styles.main_text}>Новый логин:</span>
                <input className={styles.main_form} type="text" id="username" name="username" placeholder="ivan.ivanov@gmail.ru" />
                <div
                  className={styles.main_criterion}
                >
                  ❖ Логин не может начинаться с дефиса или подчеркивания
                </div>
              </div>
              <button className={`${styles.main_button_one} ${isSavingLogin ? styles.disabled : ''}`} onClick={handleSaveLoginClick} type="button">{isSavingLogin ? 'Меняем ваш логин...' : 'Сохранить'}</button>
            </div>
          </div>
          <div className={styles.main_err_plase}>
            {/* Отображение ошибки */}
            {error && (
              <div className={styles.main_err}>
                <div className={styles.main_err_massage}>{error}</div>
              </div>
            )}
          </div>
        </form>
        )}
        <button className={styles.header_button} onClick={handleEditLoginClickTwo} type="button">Редактировать пароль</button>
        {showModalTwo && (
        <form className={styles.modalOverlay}>
          <div className={styles.modal} onClick={handleModalClick}>
            {/* Содержимое модального окна */}
            <div className={styles.modalContent}>
              {/* ... (форма или другие элементы для редактирования пароля) */}
              <img src={logo} alt="logo" />
              <div className={styles.main_info}>
              <span className={styles.main_text}>Текущий пароль:</span>
                <input className={styles.main_form} type="password" id="password" name="password" placeholder="Введите пароль" />
                <span className={styles.main_text}>Новый пароль:</span>
                <input className={styles.main_form} type="text" id="newpassword" name="username" placeholder="Введите новый пароль" />
                <input className={styles.main_form} type="text" id="repeatPassword" name="repeatPassword" placeholder="Повторите пароль" />
                <div
                  className={styles.main_criterion}
                >
                  ❖ Пароль не должен быть короче 6 символов
                </div>
              </div>
              <button className={`${styles.main_button_one} ${isSavingPassword ? styles.disabled : ''}`} onClick={handleSavePasswordClick} type="button">{isSavingPassword ? 'Меняем ваш пароль...' : 'Сохранить'}</button>
            </div>
          </div>
          <div className={styles.main_err_plase}>
            {/* Отображение ошибки */}
            {error && (
              <div className={styles.main_err}>
                <div className={styles.main_err_massage}>{error}</div>
              </div>
            )}
          </div>
        </form>
        )}
      </div>
      <span className={styles.header_title}>Мои курсы</span>
      <div className={styles.main}>
      {trainingsArray.length === 1 ? (
      <div>
        <div className={styles.main__courses}>
          <p className={styles.main__courses_none}>Нет курсов</p>
        </div>
        {showNotification ? (
          <div className={styles.main__courses_info}>
            <div className={styles.main__courses_info_two}>
            <span>Сейчас у вас нет добавленных курсов, но вы можете пройти на <Link className={styles.main__courses_bottom} to="/">главную страницу</Link> для ознакомления</span>
            </div>
          </div>
        ) : (
        null
        )}
      </div>
      ) : (
        trainingsArray.slice(1, 5).map((e) => {
          return (
            <div
              className={styles.main_direct}
              key={e.nameEN}
            >
              <div>
                <div
                  onClick={() => {
                    dispatch(setCourseName(e.nameEN));
                  }}
                >
                  <img
                    key={e.nameEN}
                    src={
                      e.nameEN === 'Yoga' ? yoga
                        : e.nameEN === 'Stretching' ? stretch
                          : e.nameEN === 'BodyFlex' ? body : ''
                    }
                    alt="img"
                  />
                  {/* <Link to={`/description/${e.nameEN}`} className={styles.main_button}>Перейти →</Link> */}
                  <button className={styles.main_button} onClick={() => handleToTraining(e.nameEN)}>Перейти →</button>
                </div>
              </div>
            </div>
          );
        })
      )}
      <Modal isOpenModalNext={isOpenModalNext} handleModalClick={handleModalClick} trainingsArray={trainingsArray}/>
      </div>
    </div>
  );
}