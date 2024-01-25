import { createSlice } from '@reduxjs/toolkit'

const sliceStore = createSlice({
  name: 'store',
  initialState: {
    courseName: '',
    currentUserUid:'',
    trainingsArray:[] 
  },
  reducers: {
    testRegimeReducer(state) {
      state.testData = 'clicked'
    },
    setCourseName(state, actions) {
      state.courseName = actions.payload
      console.log(state.courseName)
    },
    setCurrentUser(state, actions) {
      state.currentUserUid = actions.payload
      console.log(state.currentUserUid)
    },
    setTrainingsArray(state, actions) {
      state.trainingsArray = actions.payload
      console.log(state.trainingsArray)
    },
  },
})

export const { testRegimeReducer, setCourseName, setCurrentUser,setTrainingsArray } =
  sliceStore.actions
export default sliceStore.reducer
