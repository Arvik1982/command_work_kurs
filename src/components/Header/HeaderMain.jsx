import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import sale from '../../img/Sale sticker.png'
import WhiteLogo from '../Logo/whiteLogo'
import styles from './header.module.css'


export default function MainHeader() {
  // const userUid = useSelector(state=>state.store.currentUserUid)
  const userUid = localStorage.getItem('userUid')
  const userLocalLogin = localStorage.getItem('userLogin')

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

<div className={styles.header__buttons_nav}>

<Link className={!userUid?styles.display:''} to="/profile">
  <div className={styles.button__user}>
    <button className={styles.header__button_user} type="button" />
    <h2>{userLocalLogin}</h2> 
  </div>  
</Link>
  
  <Link to="/auth">
    <button type="button" className={userUid?styles.display:styles.main__header_button}>
      {userUid?"Выйти":"Вoйти"}
    </button>
  </Link>
</div>
  <img className={styles.main__header_sale} src={sale} alt="sale" />
</div>
</header>

)}