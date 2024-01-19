import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './css/myprofile.module.css';
import logo from '../img/logo.svg'
import Yoga from '../img/img_profile/yoga_profile.png'
import Stretch from '../img/img_profile/stretch_profile.png'
import Bodyflex from '../img/img_profile/bodyflex_profile.png'
import BlackLogo from "../components/Logo/BlackLogo";

export default function MyProfilePage() {
    // Стейт для отображения модального окна №1
    const [showModal, setShowModal] = useState(false);
    // Стейт для отображения модального окна №2
    const [showModalTwo, setShowModalTwo] = useState(false);

    // Функция клика по кнопке "Смена логина"
    const handleEditLoginClick = () => {
      setShowModal(true);
    }
    // Функция клика по кнопке "Смена пароля"
    const handleEditLoginClickTwo = () => {
        setShowModalTwo(true);
      }
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <BlackLogo route='/profile'/>
        <div className={styles.header_profile}>
            <div className={styles.header_photo}/>
            <div>Профиль</div>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <span className={styles.header_title}>Мой профиль</span>
        <span className={styles.header_info}>Логин: LapaBelka</span>
        <span className={styles.header_info}>Пароль: 123456789</span>
        <button className={styles.header_button} onClick={handleEditLoginClick} type='submit'>Редактировать логин</button>
        {showModal &&
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {/* Содержимое модального окна */}
            <div className={styles.modalContent}>
              {/* ... (форма или другие элементы для редактирования логина) */}
              <img src={logo} alt="logo" />
              <div className={styles.main_info}>
                <span className={styles.main_text}>Новый логин:</span>
                <input className={styles.main_form} type="text" id="username" name="username" placeholder="Введите новый логин" />
              </div>
              <button className={styles.main_button_one} onClick={() => setShowModal(false)}  type='button'>Сохранить</button>
            </div>
          </div>
        </div>
      }
        <button className={styles.header_button} onClick={handleEditLoginClickTwo} type="button">Редактировать пароль</button>
        {showModalTwo &&
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {/* Содержимое модального окна */}
            <div className={styles.modalContent}>
              {/* ... (форма или другие элементы для редактирования пароля) */}
              <img src={logo} alt="logo" />
              <div className={styles.main_info}>
                <span className={styles.main_text}>Новый пароль:</span>
                <input className={styles.main_form} type="text" id="username" name="username" placeholder="Введите новый пароль" />
                <input className={styles.main_form} type="text" id="username" name="username" placeholder="Повторите пароль" />
              </div>
              <button className={styles.main_button_one} onClick={() => setShowModalTwo(false)}  type='button'>Сохранить</button>
            </div>
          </div>
        </div>
      }
      </div>
      <div>
        <span className={styles.header_title}>Мои курсы</span>
        <div className={styles.main}>
          <div className={styles.main_nav}>
            <img className={styles.main_direct} src={Yoga} alt="logo" />
            <Link to="/description" className={styles.main_button}>Перейти →</Link>
          </div>
          <div className={styles.main_nav}>
            <img className={styles.main_direct} src={Stretch} alt="logo" />
            <Link to="/description" className={styles.main_button}>Перейти →</Link>
          </div>
          <div className={styles.main_nav}>
            <img className={styles.main_direct} src={Bodyflex} alt="logo" />
            <Link to="/description" className={styles.main_button}>Перейти →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}