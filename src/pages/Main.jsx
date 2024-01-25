import { useEffect} from 'react'
//  redux
import { useDispatch} from 'react-redux'
import { setTrainingsArray} from '../store/sliceStore'
//
import { getAllCourses } from '../api'
import styles from './css/main.module.css'
import styleBody from '../styleBody'
import GoTop from '../components/GoTop/GoTop'
import MainCourses from '../components/Main/CoursesMain'
import MainHeader from '../components/Header/HeaderMain'


export default function MainPage() {
  const dispatch = useDispatch()
    useEffect(() => {
    styleBody('#271A58')
    
    getAllCourses().then((data) => {
      const arr = [...Object.values(data)]
      dispatch(setTrainingsArray(arr))
      return data
    })
  }, [])

  return (
    <div className={styles.main}>
      <MainHeader/>
      <MainCourses/>
       <div className={styles.main__footer}>
        <GoTop />
      </div>
    </div>
  )
}
