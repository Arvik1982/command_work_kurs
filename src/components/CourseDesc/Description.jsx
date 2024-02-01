import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import styleBody from '../../styleBody'
import BlackLogo from '../Logo/BlackLogo'
import numberOne from '../../img/img_descr/descr number 1.png'
import numberTwo from '../../img/img_descr/descr number 2.png'
import numberThree from '../../img/img_descr/descr number 3.png'
import phoneHand from '../../img/img_descr/descr phone hand img.png'
import styles from './description.module.css'
import Burger from '../Burger'
import Modal from '../Modal'

export default function DescriptionPage2() {
  const navigate = useNavigate()
  const [isOpenModalNext, setIsOpenModalNext] = useState(false) // Инициализация состояния модального окна
  const id = useParams() // Получение параметра маршрута
  let courses = useSelector((state) => state.store.trainingsArray) // Получение данных из Redux store
  const userIsRegistered = localStorage.getItem('userUid') // Проверка, зарегистрирован ли пользователь
  const [currentUser] = useState({ email: localStorage.getItem('userLogin') })
  let currentCourse
  // Функция для изоляции
  const handleModalClick = (event) => {
    event.stopPropagation()
  }
  // Функция для закрытия модального окна
  const handleClickOutside = (event) => {
    if (isOpenModalNext && !event.target.closest(`.${styles.modal}`)) {
      setIsOpenModalNext(false)
    }
  }

  useEffect(() => {
    styleBody('#fff') // Вызов функции для изменения стилей страницы при монтировании
  }, [])

  id.id ? (currentCourse = id.id) : ''
  const courseData = courses.find((course) => course.nameEN === currentCourse) // Поиск соответствующего курса
  return (
    <div className={styles.course__page} onClick={handleClickOutside}>
      <div className={styles.course__page_logo}>
        <div className={styles.top}>
          <BlackLogo />
          <Burger currentUser={currentUser} />
        </div>
      </div>
      {
        <div>
          <div className={styles.course__page_image}>
            <h1 className={styles.descr__top_text}>{courseData.nameRU}</h1>
          </div>
          <div className={styles.center_text}>
            <h2>Подойдет для вас, если:</h2>
            <div className={styles.descr__numbers}>
              <div className={styles.descr__numbers_el}>
                <div className="number_img">
                  <img src={numberOne} alt="numbers1"></img>
                </div>
                <div className="number_text">
                  <h2 className={styles.descr__numbers_text}>
                    {courseData.fitting[0]}
                  </h2>
                </div>
              </div>

              <div className={styles.descr__numbers_el}>
                <div className="number_img">
                  <img src={numberTwo} alt="numbers2"></img>
                </div>
                <div className="number_text">
                  <h2 className={styles.descr__numbers_text}>
                    {courseData.fitting[1]}
                  </h2>
                </div>
              </div>

              <div className={styles.descr__numbers_el}>
                <div className="number_img">
                  <img src={numberThree} alt="numbers3"></img>
                </div>
                <div className="number_text">
                  <h2 className={styles.descr__numbers_text}>
                    {courseData.fitting[2]}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.course__directions_text}>
            <h2>Направления</h2>
            <div className={styles.descr__block_ul} style={{ height: '96px' }}>
              <ul className={styles.descr__ul}>
                {courseData.directions.slice(0, 3).map((el) => {
                  return (
                    <li key={String(el)} itemType="disc">
                      {el}
                    </li>
                  )
                })}
              </ul>
              <ul className={styles.descr__ul}>
                {courseData.directions.slice(3, 6).map((el) => {
                  return (
                    <li>
                      <h3 className={styles.descr__numbers_text}>{el}</h3>
                    </li>
                  )
                })}
              </ul>
              <ul className={styles.descr__ul}>
                {courseData.directions.slice(6, 3).map((el) => {
                  return <li itemType="disc">{el}</li>
                })}
              </ul>
            </div>
          </div>
          <div className={styles.course__directions_info}>
            <h3 className={styles.course__directions_info}>
              Благодаря комплексному воздействию упражнений происходит
              проработка всех групп мышц, тренировка суставов, улучшается
              циркуляция крови. Кроме того, упражнения дарят отличное
              настроение, заряжают бодростью и помогают противостоять стрессам.
            </h3>
          </div>
          <div className={styles.block__phone}>
            <div className={styles.info_block}>
              <h2 className={styles.info_text}>
                {' '}
                Оставьте заявку на пробное занятие, мы свяжемся с вами, поможем
                с выбором направления и тренера, с которым тренировки принесут
                здоровье и радость!
              </h2>
              <img src={phoneHand} alt="phone" />
            </div>
            <button
              onClick={
                userIsRegistered
                  ? () => setIsOpenModalNext(true)
                  : () => navigate('/auth')
              }
              className={styles.button}
            >
              Записаться на тренировку
            </button>
          </div>

          <Modal
            isOpenModalNext={isOpenModalNext}
            handleModalClick={handleModalClick}
            selectedTraining={courseData}
          />
          {/* Рендер модального окна */}
        </div>
      }
    </div>
  )
}
