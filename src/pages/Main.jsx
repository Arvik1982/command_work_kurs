import { useEffect } from 'react'
import styles from './css/main.module.css'
import styleBody from '../styleBody'
import GoTop from '../components/GoTop/GoTop'
import MainCourses from '../components/Main/CoursesMain'
import MainHeader from '../components/Header/HeaderMain'

export default function MainPage() {
    useEffect(() => {
    styleBody('#271A58')
  }, [])

  return (
    <div className={styles.main}>
      <MainHeader />
      <MainCourses />
      <div className={styles.main__footer}>
        <GoTop />
      </div>
    </div>
  )
}
