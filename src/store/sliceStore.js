import { createSlice } from "@reduxjs/toolkit"; 

const sliceStore =createSlice({
    name: "store",

    initialState:{
        testData:'redux works',
        courseName:''
    },
    reducers:{

       testRegimeReducer(state) {
       state.testData='clicked';

        },

        setCourseName (state, actions) {
            state.courseName=actions.payload;
            console.log(state.courseName)
             },
    },
})

export const{testRegimeReducer,setCourseName}=sliceStore.actions;
export default sliceStore.reducer