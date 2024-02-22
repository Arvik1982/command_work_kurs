import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './CoursesMain.module.css'
import yoga from '../../img/img_main/yoga_main_png.png'
import stretch from '../../img/img_main/stratch_main_png.png'
import dance from '../../img/img_main/dance_main_png.png'
import step from '../../img/img_main/step_main_png.png'
import body from '../../img/img_main/body_main_png.png'
import { setCourseName, setTrainingsArray } from '../../store/sliceStore'
import { SkeletonTheme } from "react-loading-skeleton"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getMyCourses } from '../../api'
import Modal from '../../components/Modal/ModalCourse'


export default function MainCourses() {

  const[myCorses, setMyCourses]=useState([])
  const[courseName, setClickCourseName]=useState('')
  const [trainingsArrayMy, setTrainingsArrayMy] = useState([]);
  const [isOpenModalNext, setIsOpenModalNext] = useState(false);

  const navigate= useNavigate()

  const [contentLoaded, setContentLoaded]=useState(false)
  const dispatch = useDispatch()
  const reduxTrainingsArray = useSelector((state) => state.store.trainingsArray)
  const localTrainingsArray = JSON.parse(localStorage.getItem('trainingsArray'))
  const trainingsArray = reduxTrainingsArray?reduxTrainingsArray:localTrainingsArray
  


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
 
  const handleModalClick = (event) => {
    event.stopPropagation();
};

  useEffect(()=>{
  
    setTimeout(()=>{setContentLoaded(true)},1000)
  },[])

  useEffect(() => {
    
    const uid = localStorage.getItem('userUid');
    
    const fetchData = async () => {
      try {
        const data = await getMyCourses(uid);
       
        if ('course' in data) {
          setTrainingsArrayMy(data.course);
          setMyCourses(data.course)

        } else {
          setTrainingsArrayMy([0]);
         
        }
      } catch (error) {
        alert(error)
      }
    };
    if (uid){ fetchData();}
   
  }, []);


  return (
    <div className={styles.block__center}>


<Modal isOpenModalNext={isOpenModalNext} handleModalClick={handleModalClick}
                        trainingsArray={trainingsArrayMy} />
                    {/* Рендер модального окна */}



      
      <h1 className={error !== '' ? styles.block__error : styles.hide}>
        {error}
      </h1>
      <div className={styles.main__trainings_grid}>
     
        {
        displayCoursesArray
        // trainingsArray
        .map((el) => {
          return (contentLoaded?
            <div className="trainings__grid_element" key={el.nameEN}>
              <div

      className={styles.img}
      onClick={() => {
      dispatch(setCourseName(el.nameEN))
      setClickCourseName(el.nameEN)
      
      
      const datArr= Object.entries(myCorses)
      let result = datArr.
      
      find((e)=>{return(
       String( e[1].name)==String(el.nameEN))
      }
      )
     
      !result?navigate(`/description/${el.nameEN}`):setIsOpenModalNext(true)
  
}}
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
                
              {/* </Link> */}

              </div>
            </div>:
             <SkeletonTheme key={el.nameEN} baseColor="#271A58 " highlightColor="#140D40">
             <div  className={styles.skelet}>
               <Skeleton className={styles.skelet}/>
             </div>
           </SkeletonTheme>
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
