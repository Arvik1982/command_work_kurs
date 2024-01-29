// import { getDatabase, ref, set } from 'firebase/database'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './CoursesMain.module.css'
import yoga from '../../img/img_main/yoga_main_png.png'
import stretch from '../../img/img_main/stratch_main_png.png'
import dance from '../../img/img_main/dance_main_png.png'
import step from '../../img/img_main/step_main_png.png'
import body from '../../img/img_main/body_main_png.png'
import { setCourseName } from '../../store/sliceStore'

export default function MainCourses() {
  // const courseName = 'Yoga'
  const dispatch = useDispatch()
  const trainingsArray = useSelector((state) => state.store.trainingsArray)
  const error = useSelector((state) => state.store.connectionError)
  const [pageNumber, setPageNumber] = useState(0)
  const onPageChange = ({ selected }) => {
    setPageNumber(selected)
  }
  const coursesOnPage = 5
  const pagesVisited = pageNumber * coursesOnPage
  const displayCoursesArray = trainingsArray.slice(
    pagesVisited,
    pagesVisited + coursesOnPage,
  )
  const pageCount = Math.ceil(trainingsArray.length / coursesOnPage)

  return (
    <div className={styles.block__center}>
      <h1 className={error !== '' ? styles.block__error : styles.hide}>
        {error}
      </h1>
      <div className={styles.main__trainings_grid}>
        {displayCoursesArray.map((el) => {
          return (
            <div className="trainings__grid_element" key={el.nameEN}>
              <Link
                className={styles.img}
                onClick={() => {
                  dispatch(setCourseName(el.nameEN))
                }}
                to={`/description/${el.nameEN}`}
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

      <ReactPaginate
        previousLabel="Предыдущая"
        nextLabel="Следующая"
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={styles.paginateButtons}
        previousClassName={styles.paginatePrevButtons}
        nextClassName={styles.paginateNextButtons}
        disabledClassName={pageCount<=1?styles.paginateDisabled:''}
        activeClassName={styles.paginateActive}
      />
    </div>
  )
}
