import { getDatabase, ref, set } from 'firebase/database'
import styles from './goTop.module.css'

export default function SetCourse() {

    function writeUserData(userId, name, email, imageUrl, id, courses) {
        const db = getDatabase()
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
          profile_picture: imageUrl,
          id: id,
          courses:courses,
        })
      }  
  const setCourse = () => {
    writeUserData(userId, name, email, imageUrl, id, courses)
  }

  return (
    <button
      type="button"
      className={styles.main__footer_button}
      onClick={()=>{setCourse()}}
    >
    set course
    </button>
  )
}
