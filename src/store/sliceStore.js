import { createSlice } from '@reduxjs/toolkit'

const sliceStore = createSlice({
  name: 'store',
  initialState: {
    courseName: '',
    currentUserUid:'',
    trainingsArray:[],
    connectionError:'' 
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
    setConnectionError(state, actions) {
      state.connectionError = actions.payload
      console.log(state.connectionError)
    },
  },
})

export const { testRegimeReducer, setCourseName, setCurrentUser,setTrainingsArray,setConnectionError } =
  sliceStore.actions
export default sliceStore.reducer
