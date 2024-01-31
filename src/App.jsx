// import './app.module.css';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes';
import ContentBox from "./components/ContentBox/ContentBox";
import styles from './app.module.css'
import { getAllWorkouts } from './api';
import { useEffect } from 'react';
import { setAllWorkoutsArray } from './store/sliceStore';


function App() {
const dispatch=useDispatch()
  useEffect(()=>{
    getAllWorkouts().then((data)=>{
    dispatch(setAllWorkoutsArray(data))}
    )
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
