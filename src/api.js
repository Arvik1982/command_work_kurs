import {getDatabase, ref, set} from "firebase/database";

export async function getAllCourses() {
  const response = await fetch(
    'https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/courses.json',
    {
      method: 'GET',
    },
  )
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()

  return newData
}

export async function getMyCourses(uid) {
  const response = await fetch(
    `https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/courses.json`,
    {
      method: 'GET',
    },
  )
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()

  return newData
}

export async function getAllWorkouts() {
  const response = await fetch(
    'https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/workouts.json',
    {
      method: 'GET',
    },
  )
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()
  
  return newData
}

export async function getAllUsers() {
  const response = await fetch(
    'https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/users.json',
    {
      method: 'GET',
    },
  )
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()

  return newData
}

export async function getLesson(id) {
  const response = await fetch(
      `https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/workouts/${id}.json`,
      {
        method: 'GET',
      },
  )
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()

  return newData
}

export async function getLessonsUser(courseId) {
  const user = localStorage.userUid
  const response = await fetch(
      `https://fitness-pro-5a801-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/course/${courseId}.json`,
      {
        method: 'GET',
      },
  )
  if (!response.ok) {
    throw new Error('Ошибка сервера')
  }
  const newData = await response.json()

  return newData
}

export function postCourse(courseId, courseName, progress) {
  const db = getDatabase()
  const user = localStorage.userUid

  set(ref(db, `users/${user}/course/` + courseId), {
    name: courseName,
    progress
  })

}