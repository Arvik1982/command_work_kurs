import styles from './css/myprofile.module.css';
import logo from '../img/logo.png'
import Yoga from '../img/prof card 2 yoga.png'
import Stretch from '../img/prof card 3 str.png'
import Bodyflex from '../img/prof card 28 body.png'

export default function MyProfilePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={logo} alt="logo" />
        <div>Профиль</div>
      </div>
      <div className={styles.header_bottom}>
        <span className={styles.header_title}>Мой профиль</span>
        <span className={styles.header_info}>Логин: LapaBelka</span>
        <span className={styles.header_info}>Пароль: 123456789</span>
        <button className={styles.header_button} type="button">Редактировать логин</button>
        <button className={styles.header_button} type="button">Редактировать пароль</button>
      </div>
      <div>
        <span className={styles.header_title}>Мои курсы</span>
        <div className={styles.main}>
          <div className={styles.main_nav}>
            <img className={styles.main_direct} src={Yoga} alt="logo" />
            <button className={styles.main_button} type="button">Перейти →</button>
          </div>
          <div className={styles.main_nav}>
            <img className={styles.main_direct} src={Stretch} alt="logo" />
            <button className={styles.main_button} type="button">Перейти →</button>
          </div>
          <div className={styles.main_nav}>
            <img className={styles.main_direct_two} src={Bodyflex} alt="logo" />
            <button className={styles.main_button_two} type="button">Перейти →</button>
          </div>
        </div>
      </div>
    </div>
  )
}