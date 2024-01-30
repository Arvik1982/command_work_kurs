import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import profile from '../../img/img_profile/user.png';
import open from '../../img/img_profile/bot.png';
import close from '../../img/img_profile/top.png';

const Burger = ({ currentUser }) => {
    const navigate = useNavigate();
    // Стейт для бургер-меню
    const [isOpen, setIsOpen] = useState(false);

    // Клик по кнопке "Выйти"
    const handleLogout = () => {
        // Очистка данных из local Store
        localStorage.removeItem('userUid');
        localStorage.removeItem('userLogin');
        localStorage.removeItem('userPass');
        // Редирект на страницу авторизации
        navigate('/auth');
    };
    // Бургер меню
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
    <div className={styles.header_links} style={{ position: 'relative' }}>
      <div className={styles.header_profile} onClick={toggleMenu}>
        <img src={profile} className={styles.header_photo} />
        <span>{currentUser?.email}</span>
        <img src={isOpen ? close : open} className={styles.header_burger_open} />
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu} style={{ position: 'absolute', top: 90, right: 0 }}>
          <Link className={styles.header_links_main} to="/">На главную</Link>
          <Link className={styles.header_links_main} to="/profile">Профиль</Link>
          <div className={styles.header_links_main} onClick={handleLogout}>Выйти</div>
        </div>
      )}
    </div>
    );
}

export default Burger;
