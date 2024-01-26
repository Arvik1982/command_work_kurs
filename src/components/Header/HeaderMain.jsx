// import { useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import sale from '../../img/Sale sticker.png'
import WhiteLogo from '../Logo/whiteLogo'
import styles from './header.module.css'
import { useState } from 'react'
import rectangle from './Rectangle 3765.svg'

export default function MainHeader() {
  // const userUid = useSelector(state=>state.store.currentUserUid)
  const userUid = localStorage.getItem('userUid')
  const userLocalLogin = localStorage.getItem('userLogin')
  const [exit, setExit]=useState(false)

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

<div className={!userUid?styles.display:''}>
  <div className={styles.button__user}>
    
  <Link className={!userUid?styles.display:''} to="/profile">
    <button className={styles.header__button_user} type="button" />
    </Link>
    <div className={styles.select}>
      <ul >
        <li style={{display: 'flex', gap: '5px',alignItems: 'center'}}>
          <h2>{userLocalLogin}</h2>

          <img style={{
            
            cursor:'pointer',
            height: '20px',
            width: '20px'
            }} onClick={()=>!exit?setExit(true):setExit(false)} src={rectangle} alt="rectangle"/>         
          
        </li>
        <li style={{display:'block', position:'absolute'}}>
          <Link to="/auth">
          <h3 className={!exit?styles.display:styles.button__user_exit}>Выйти</h3>
          </Link>

        </li>     
      </ul>
    </div>
    
  </div>  
  </div>
  
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