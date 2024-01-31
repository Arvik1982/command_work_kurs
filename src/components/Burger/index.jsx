import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import profile from '../../img/img_profile/user.png';
import open from '../../img/img_profile/bot.png';
import close from '../../img/img_profile/top.png';
import home from '../../img/img_profile/home.png';
import me from '../../img/img_profile/me.png';
import exit from '../../img/img_profile/exit.png';

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
            <Link className={styles.dropdownMenu_block} to="/">
              <div className={styles.dropdownMenu_block_img}>
                <img src={home} className={styles.header_photo_two} />
              </div>
              <div className={styles.header_links_main}>На главную</div>
            </Link>
            <Link className={styles.dropdownMenu_block} to="/profile">
              <div className={styles.dropdownMenu_block_img}>
                <img src={me} className={styles.header_photo_two} />
              </div>
              <div className={styles.header_links_main}>Профиль</div>
            </Link>
            <div className={styles.dropdownMenu_block} onClick={handleLogout}>
              <div className={styles.dropdownMenu_block_img}>
                <img src={exit} className={styles.header_photo_two} />
              </div>
              <div className={styles.header_links_main} >Выйти</div>
            </div> 
        </div>
      )}
    </div>
    );
}

export default Burger;
