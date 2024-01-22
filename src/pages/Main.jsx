import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
//  redux
import { useDispatch } from 'react-redux'
import { setCourseName } from '../store/sliceStore'
//
import { getAllCourses, getAllUsers } from '../api'
// import logo from '../img/logo.png'
import sale from '../img/Sale sticker.png'
import styles from './css/main.module.css'
import yoga from '../img/img_main/yoga_main_png.png'
import stretch from '../img/img_main/stratch_main_png.png'
import dance from '../img/img_main/dance_main_png.png'
import step from '../img/img_main/step_main_png.png'
import body from '../img/img_main/body_main_png.png'
import styleBody from '../styleBody'
import WhiteLogo from '../components/Logo/whiteLogo'
import GoTop from '../components/GoTop/GoTop'
import UserUid from '../components/UserUid/UserUid'

export default function MainPage() {
  const dispatch = useDispatch()
  const [trainingsArray, setTrainingsArray] = useState([])

  useEffect(() => {
    styleBody('#271A58')
    getAllUsers().then((response) => {
      console.log(response)
    })
    getAllCourses().then((data) => {
      const arr = [...Object.values(data)]
      setTrainingsArray(arr)
      return data
    })
  }, [])

  return (
    <div className={styles.main}>
      <header className={styles.main__header}>
        <div className={styles.main__header_left}>
          <WhiteLogo />
          <h3 className={styles.main__description}>
            Онлайн-тренировки для занятий дома
          </h3>
          <h2 className={styles.main__title}>
            Начните заниматься спортом и улучшите качество жизни
          </h2>
          <UserUid />
        </div>
        <div className={styles.main__header_right}>
          <Link to="/auth">
            <button type="button" className={styles.main__header_button}>
              Вoйти
            </button>
          </Link>
          <img className={styles.main__header_sale} src={sale} alt="sale" />
        </div>
      </header>
      <div className={styles.main__trainings_grid}>
        {trainingsArray.map((el) => {
          return (
            <div className="trainings__grid_element" key={el.nameEN}>
              <Link
                className={styles.img}
                onClick={() => {
                  dispatch(setCourseName(el.nameEN))
                }}
                to="/description"
              >
                <img
                  key={el.nameEN}
                  src={
                    el.nameEN === 'Yoga'
                      ? yoga
                      : el.nameEN === 'Stretching'
                        ? stretch
                        : el.nameEN === 'DanceFitness'
                          ? dance
                          : el.nameEN === 'StepAirobic'
                            ? step
                            : el.nameEN === 'BodyFlex'
                              ? body
                              : ''
                  }
                  alt="img"
                />
              </Link>
            </div>
          )
        })}
      </div>
      <div className={styles.main__footer}>
        <GoTop />
        {/* <button type='button' className={styles.main__footer_button}>Наверх ↑</button> */}
      </div>
    </div>
  )
}
