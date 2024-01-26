import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateEmail } from 'firebase/auth';
import { auth } from '../firebase_auth';
import { getAllCourses } from '../api';
import { setCourseName } from '../store/sliceStore';
import styles from './css/myprofile.module.css';
import logo from '../img/logo.svg';
import BlackLogo from '../components/Logo/BlackLogo';
import yoga from '../img/img_profile/yoga_profile.png';
import stretch from '../img/img_profile/stretch_profile.png';
import body from '../img/img_profile/bodyflex_profile.png';
import styleBody from '../styleBody';
import profile from '../img/img_profile/user.png';
import open from '../img/img_profile/bot.png';
import close from '../img/img_profile/top.png';

export default function MyProfilePage() {
  // const userLocalLogin = localStorage.getItem('userLogin')
  // const userLocalPass = localStorage.getItem('userPass')
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  // Стейт для бургер-меню
  const [isOpen, setIsOpen] = useState(false);
  // Функция клика по кнопке "выйти"
  const handleLogout = () => {
    // Очистка данных из состояния хранилища
    // dispatch(setCurrentUser(null));
    // Очистка данных из локального хранилища
    localStorage.removeItem('userUid');
    localStorage.removeItem('currentUserEmail');
    // Редирект на страницу авторизации
    navigate('/auth');
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
    if ((showModal || showModalTwo) && !event.target.closest(`.${styles.modal}`)) {
      setShowModal(false);
      setShowModalTwo(false);
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
  // Получение курсов (АПИ)
  useEffect(() => {
    styleBody('#FAFAFA')
    getAllCourses().then((data) => {
      const arr = [...Object.values(data)];
      setTrainingsArray(arr);
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
  // Бургер меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.wrapper} onClick={handleClickOutside}>
      <div className={styles.header}>
        <BlackLogo route="/profile" />
        <div className={styles.header_links}  style={{ position: 'relative' }}>
          <div className={styles.header_profile} onClick={toggleMenu}>
            <img src={profile} className={styles.header_photo}/>
            <span>{currentUser?.email}</span>
            <img src={isOpen ? close : open} className={styles.header_burger_open}/>
          </div>
          {isOpen && (
            <div className={styles.dropdownMenu} style={{ position: 'absolute', top: 90, right: 0 }}>
              <Link className={styles.header_links_main}  to="/">На главную</Link>
              <div className={styles.header_links_main} onClick={handleLogout}>Выйти</div>
            </div>
          )}
        </div>
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
            <span className={styles.header_info_login}>{currentUser?.password}</span>
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
        {Object.values(trainingsArray).slice(1, 4).map((e) => {
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
                  <Link to={`/description/${e.nameEN}`} className={styles.main_button}>Перейти →</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}