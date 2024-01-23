import { createSlice } from "@reduxjs/toolkit"; 

const sliceStore =createSlice({
    name: "store",

    initialState:{
        courseName:'',
        currentUserUid:[1],
    },
    reducers:{

       testRegimeReducer(state) {
       state.testData='clicked';

        },

        setCourseName (state, actions) {
            state.courseName=actions.payload;
            console.log(state.courseName)
             },
        setCurrentUser (state, actions) {
                state.currentUserUid=actions.payload;
                console.log(state.currentUserUid)
                 },
    },
})

export const{testRegimeReducer,setCourseName,setCurrentUser}=sliceStore.actions;
export default sliceStore.reducer