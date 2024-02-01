// import './app.module.css';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes';
import ContentBox from "./components/ContentBox/ContentBox";
import styles from './app.module.css'
import { getAllCourses, getAllWorkouts } from './api';
import { useEffect } from 'react';
import { 
  setAllWorkoutsArray, 
  setConnectionError, 
  setTrainingsArray 
} from './store/sliceStore';

function App() {
const dispatch=useDispatch()
  useEffect(()=>{
    getAllWorkouts().then((data)=>{
    dispatch(setAllWorkoutsArray(data))}
    ).catch((error)=>{
      dispatch(setConnectionError(error.message))
    })

    getAllCourses()
    .then((data) => {
      const arr = [...Object.values(data)]
      dispatch(setTrainingsArray(arr))
      dispatch(setConnectionError(''))
      return data
    })
    .catch((error) => {
      dispatch(setConnectionError(error.message))
    })

  },[])


  return (
    <div className={styles.app}>
      <ContentBox>
        <AppRoutes />
      </ContentBox>
    </div>
  )
}

export default App
