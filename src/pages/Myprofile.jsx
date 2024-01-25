// import { useDispatch } from 'react-redux';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllCourses } from '../api';
// import { setCourseName } from '../store/sliceStore';
// import styles from './css/myprofile.module.css';
// import logo from '../img/logo.svg'
// import Yoga from '../img/img_profile/yoga_profile.png'
// import Stretch from '../img/img_profile/stretch_profile.png'
// import Bodyflex from '../img/img_profile/bodyflex_profile.png'
// import BlackLogo from "../components/Logo/BlackLogo";

// export default function MyProfilePage() {


//      // Стейт для отображения модального окна №1
//     const [showModal, setShowModal] = useState(false);
//     // Стейт для отображения модального окна №2
//     const [showModalTwo, setShowModalTwo] = useState(false);

//     // Функция клика по кнопке "Смена логина"
//     const handleEditLoginClick = () => {
//       setShowModal(true);
//     }
//     // Функция клика по кнопке "Смена пароля"
//     const handleEditLoginClickTwo = () => {
//         setShowModalTwo(true);
//       }
  
//   return (
//       // <div>eif</div>
//     <div className={styles.wrapper} 

//     // onClick={handleClickOutside}
    
//     >
//     <div className={styles.header}>
//         <BlackLogo route='/profile'/>
//         <div className={styles.header_profile}>
//             <div className={styles.header_photo}/>
//             <div>Профиль</div>
//           </div>
//       </div>
//       <div className={styles.header_bottom}>
//         <span className={styles.header_title}>Мой профиль</span>
//         <span className={styles.header_info}>Логин: LapaBelka</span>
//         <span className={styles.header_info}>Пароль: 123456789</span>
//         <button className={styles.header_button} onClick={handleEditLoginClick} type="submit">Редактировать логин</button>
//         {showModal && (
//         <form className={styles.modalOverlay}>
//           <div className={styles.modal} onClick={handleModalClick}>
//             {/* Содержимое модального окна */}
//             <div className={styles.modalContent}>
//               {/* ... (форма или другие элементы для редактирования логина) */}
//               <img src={logo} alt="logo" />
//               <div className={styles.main_info}>
//                 <span className={styles.main_text}>Новый логин:</span>
//                 <input className={styles.main_form} type="text" id="username" name="username" placeholder="Введите новый логин" />
//               </div>
//               <button className={styles.main_button_one} onClick={() => setShowModal(false)}  type='button'>Сохранить</button>
//             </div>
//           </div>
//         </form>)
//       }
//         <button className={styles.header_button} onClick={handleEditLoginClickTwo} type="button">Редактировать пароль</button>
//         {showModalTwo && (
//         <form className={styles.modalOverlay}>
//           <div className={styles.modal} onClick={handleModalClick}>
//             {/* Содержимое модального окна */}
//             <div className={styles.modalContent}>
//               {/* ... (форма или другие элементы для редактирования пароля) */}
//               <img src={logo} alt="logo" />
//               <div className={styles.main_info}>
//                 <span className={styles.main_text}>Новый пароль:</span>
//                 <input className={styles.main_form} type="text" id="password" name="username" placeholder="Введите новый пароль" />
//                 <input className={styles.main_form} type="text" id="repeatPassword" name="username" placeholder="Повторите пароль" />
//                 <div
//                   className={styles.main_criterion}
//                 >
//                   ❖ Пароль не должен быть короче 6 символов
//                 </div>
//                 <div
//                   className={styles.main_criterion}
//                 >
//                   ❖ Ваши пароли должны совпадать
//                 </div>
//               </div>
//               <button className={styles.main_button_one} onClick={() => setShowModalTwo(false)}  type='button'>Сохранить</button>
//             </div>
//           </div>
//         </form>)
//       }
//       </div>
//       <span className={styles.header_title}>Мои курсы</span>
//       <div className={styles.main}>
//         {Object.values(trainingsArray).slice(1, 4).map((e) => {
//           return (
//             <div
//               className={styles.main_direct}
//               key={e.nameEN}
//             >
//               <div>
//                 <div
//                   onClick={() => {
//                     dispatch(setCourseName(e.nameEN));
//                   }}
//                 >
//                   <img
//                     key={e.nameEN}
//                     src={
//                       e.nameEN === 'Yoga' ? yoga
//                         : e.nameEN === 'Stretching' ? stretch
//                           : e.nameEN === 'BodyFlex' ? body : ''
//                     }
//                     alt="img"
//                   />
//                   <Link to={`/description/${e.nameEN}`} className={styles.main_button}>Перейти →</Link>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updatePassword, updateEmail } from 'firebase/auth';
import { auth } from '../firebase_auth';
import { getAllCourses } from '../api';
import { clearUserData, setCourseName } from '../store/sliceStore';
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
    <div className={styles.wrapper} onClick={handleClickOutside}>
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