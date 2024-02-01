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
