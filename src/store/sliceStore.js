import {createSlice} from '@reduxjs/toolkit'

const sliceStore = createSlice({
  name: 'store',
  initialState: {
    courseName: JSON.parse(localStorage.getItem('courseName')),
    currentUserUid: '',
    trainingsArray: [],
    lesson: [],
    progress: null,
    currentCourseArray:[],
    workoutsArray: JSON.parse(localStorage.getItem('workouts')),
    connectionError: '',
  },

  reducers: {
    setCourseName(state, actions) {
      state.courseName = actions.payload
      localStorage.setItem('courseName', JSON.stringify(actions.payload))
    },
    setCurrentUser(state, actions) {
      state.currentUserUid = actions.payload
    },

    setTrainingsArray(state, actions) {

        state.trainingsArray = actions.payload
        localStorage.setItem('trainingsArray',JSON.stringify(actions.payload))
        },


    setConnectionError(state, actions) {
      state.connectionError = actions.payload
    },

    setAllWorkoutsArray(state, actions) {
      state.workoutsArray = actions.payload
      localStorage.setItem('workouts', JSON.stringify(actions.payload))
    },

    setLesson(state, {payload}){
      state.lesson = payload
    },
    setProgress(state, {payload}) {
      state.progress = payload
  
  },

  setCurrentCourseArray(state, actions) {
    state.currentCourseArray = actions.payload
  }}
})

export const {
  testRegimeReducer,
  setCourseName,
  setCurrentUser,
  setTrainingsArray,
  setConnectionError,
  setAllWorkoutsArray,
  setLesson,
  setProgress,
  setCurrentCourseArray

} = sliceStore.actions

export default sliceStore.reducer
