import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCourses } from '../api';
import { clearUserData, setCourseName } from '../store/sliceStore';
import styles from './css/myprofile.module.css';
import logo from '../img/logo.svg';
import BlackLogo from '../components/Logo/BlackLogo';
import yoga from '../img/img_profile/yoga_profile.png';
import stretch from '../img/img_profile/stretch_profile.png';
import body from '../img/img_profile/bodyflex_profile.png';
// import userPhoto from '../img/img_profile/user_photo.png';
import styleBody from '../styleBody';

export default function MyProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Получение значения UID из глобального состояния
  const currentUser = useSelector((state) => state.store.currentUserUid);
    // Получение значения UID из local Storage
  const localUser = localStorage.getItem('userUid');
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
  // Функция клика по кнопке "выйти"
  const handleLogout = () => {
    // Очистка данных из состояния хранилища
    dispatch(clearUserData());
    // Очистка данных из локального хранилища
    localStorage.removeItem('userUid');
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
  // Сохранение пароля (АПИ) недоделан
  const handleSavePasswordClick = () => {
    const newPassword = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const errors = [];
    switch (true) {
      case !newPassword.length || !repeatPassword.length:
        errors.push('Заполните поля ввода');
        break;
      case newPassword.length < 6 && repeatPassword.length < 6:
        errors.push('Слишком короткий пароль');
        break;
      case newPassword !== repeatPassword:
        errors.push('Ваши пароли не совпадают');
        break;
      default:
        // Сбрасываем ошибки, если они были ранее
        setError('');
        setIsSavingPassword(true);
        fetch(
          'https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/users/2/password.json',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword }),
          },
        ).then((response) => {
          // Обработка успешного ответа от сервера
          if (response.ok) {
            // console.log('Пароль успешно обновлен');
            setShowModalTwo(false);
            setIsSavingPassword(false);
          } else if (response.status === 404) {
            errors.push('Ресурс не найден');
            setError(errors.join(', '));
            setIsSavingPassword(false);
          } else {
            errors.push('Ошибка при обновлении пароля');
            setIsSavingPassword(false);
          }
        }).catch((err) => {
          errors.push(`Ошибка сети: ${err.message}`);
          setIsSavingPassword(false);
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
    const errors = [];
    switch (true) {
      case !newLogin:
        errors.push('Заполните поля ввода');
        break;
      case !newLogin.match(validUsername):
        errors.push('Логин должен содержать только латинские буквы, цифры и не начинаться с дефиса или подчеркивания');
        break;
      default:
      // Сбрасываем ошибки, если они были ранее
        setError('');
        setIsSavingLogin(true);
        fetch('https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/users/VTzEuBAUq4OENpadTglXOSAwilQ2.json', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: newLogin, username: newLogin }),
        }).then((response) => {
          // Обработка успешного ответа от сервера
          if (response.ok) {
            // console.log('Логин успешно обновлен');
            setShowModal(false);
            setIsSavingLogin(false);
          } else if (response.status === 404) {
            errors.push('Ресурс не найден');
            setIsSavingLogin(false);
            setError(errors.join(', '));
          } else if (response.status === 400) {
            errors.push('Логин неправильного формата');
            setError(errors.join(', '));
            setIsSavingLogin(false);
          } else {
            errors.push('Ошибка при обновлении пароля');
            setIsSavingLogin(false);
          }
        }).catch((err) => {
          errors.push(`Ошибка сети: ${err.message}`);
          setIsSavingLogin(false);
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
  return (
    <div className={styles.wrapper} onClick={handleClickOutside}>
      <div className={styles.header}>
        <BlackLogo route="/profile" />
        <div className={styles.header_links}>
          <Link className={styles.header_links_main}  to="/">На главную</Link>
          <Link className={styles.header_profile} to="/profile">
            <div className={styles.header_links_profile} onClick={handleLogout}>Выйти</div>
          </Link>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <span className={styles.header_title}>Мой профиль</span>
        <span className={styles.header_info}>Логин: LapaBelka</span>
        <span className={styles.header_info}>Пароль: 123456789</span>
        <button className={styles.header_button} onClick={handleEditLoginClick} type="submit">Редактировать логин</button>
        {showModal && (
        <form className={styles.modalOverlay}>
          <div className={styles.modal} onClick={handleModalClick}>
            {/* Содержимое модального окна */}
            <div className={styles.modalContent}>
              {/* ... (форма или другие элементы для редактирования логина) */}
              <img src={logo} alt="logo" />
              <div className={styles.main_info}>
                <span className={styles.main_text}>Новый логин:</span>
                <input className={styles.main_form} type="text" id="username" name="username" placeholder="ivan.ivanov@gmail.ru" />
                <div
                  className={styles.main_criterion}
                >
                  ❖ Логин не может начинаться с дефиса или подчеркивания
                </div>
                <div
                  className={styles.main_criterion}
                >
                  ❖ Логин должен содержать латинские буквы
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
                <span className={styles.main_text}>Новый пароль:</span>
                <input className={styles.main_form} type="text" id="password" name="username" placeholder="Введите новый пароль" />
                <input className={styles.main_form} type="text" id="repeatPassword" name="username" placeholder="Повторите пароль" />
                <div
                  className={styles.main_criterion}
                >
                  ❖ Пароль не должен быть короче 6 символов
                </div>
                <div
                  className={styles.main_criterion}
                >
                  ❖ Ваши пароли должны совпадать
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
