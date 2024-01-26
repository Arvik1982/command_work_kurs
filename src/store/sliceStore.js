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
      
    },
    setCurrentUser(state, actions) {
      state.currentUserUid = actions.payload
     
    },
    setTrainingsArray(state, actions) {
      state.trainingsArray = actions.payload
      
    },
    setConnectionError(state, actions) {
      state.connectionError = actions.payload
      
    },
  },
})

export const { testRegimeReducer, setCourseName, setCurrentUser,setTrainingsArray,setConnectionError } =
  sliceStore.actions
export default sliceStore.reducer
