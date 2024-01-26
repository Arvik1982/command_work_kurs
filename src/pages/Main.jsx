import { useEffect} from 'react'

//  redux
import { useDispatch} from 'react-redux'
import { setTrainingsArray, setConnectionError} from '../store/sliceStore'
//
import { getAllCourses } from '../api'
import styles from './css/main.module.css'
import styleBody from '../styleBody'
import GoTop from '../components/GoTop/GoTop'
import MainCourses from '../components/Main/CoursesMain'
import MainHeader from '../components/Header/HeaderMain'


export default function MainPage() {
  // const userLocalLogin = localStorage.getItem('userLogin')
  // const userLocalPass = localStorage.getItem('userPass')
  const dispatch = useDispatch()
    useEffect(() => {
    styleBody('#271A58')
    
    getAllCourses().then((data) => {
      const arr = [...Object.values(data)]
      dispatch(setTrainingsArray(arr))
      dispatch(setConnectionError(''))
      return data
    }).catch((error)=>{dispatch(setConnectionError(error))

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
