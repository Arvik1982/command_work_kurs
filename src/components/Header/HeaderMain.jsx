import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import sale from '../../img/Sale sticker.png'
import WhiteLogo from '../Logo/whiteLogo'
import styles from './header.module.css'


export default function MainHeader() {
    const userUid = localStorage.getItem('userUid')
    // useSelector(state=>state.store.currentUserUid)

return(
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
  {userUid&&<div className='user_is_logined'>
  <Link to="/profile">
    <button type="button" className={styles.main__header_button}>Профиль
    </button>
  </Link>
  </div>}
  {!userUid&&<div className='user_is_NOT_logined'>
  <Link to="/auth">
    <button type="button" className={styles.main__header_button}>
      Вoйти
    </button>
  </Link>
  </div>}
<img className={styles.main__header_sale} src={sale} alt="sale" />
</div>
</header>

)}