import { createSlice } from "@reduxjs/toolkit"; 

const sliceStore =createSlice({
    name: "store",

    initialState:{
        testData:'redux works',
    },
    reducers:{

       testRegimeReducer(state) {
       state.testData='clicked';

        },
    },
})

export const{testRegimeReducer}=sliceStore.actions;
export default sliceStore.reducer