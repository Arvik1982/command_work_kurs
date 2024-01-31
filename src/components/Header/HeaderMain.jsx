import { Link } from 'react-router-dom'
import sale from '../../img/Sale sticker.png'
import WhiteLogo from '../Logo/whiteLogo'
import styles from './header.module.css'
import Burger from '../Burger'
import { useState } from 'react'

export default function MainHeader() {
  const userUid = localStorage.getItem('userUid')
  const [currentUser]=useState({ email: localStorage.getItem('userLogin')})

  return (
    <header className={styles.main__header}>
      <div className={styles.main__header_left}>
        <WhiteLogo />
        <h3 className={styles.main__description}>
          Онлайн-тренировки для занятий дома
        </h3>
        <h2 className={styles.main__title}>
          Начните заниматься спортом и улучшите качество жизни
        </h2>
      </div>
      <div className={styles.main__header_right}>
        {userUid && (
          <div className={styles.burger}>
            <Burger currentUser={currentUser}/>
          </div>
        )}
        {!userUid && (
          <div className="user__not_logined">
            <Link to="/auth">
              <button type="button" className={styles.main__header_button}>
                Вoйти
              </button>
            </Link>
          </div>
        )}
        <img className={styles.main__header_sale} src={sale} alt="sale" />
      </div>
    </header>
  )
}
