import { configureStore } from "@reduxjs/toolkit";
import sliceStoreReducer from "./sliceStore";

export default configureStore({
    reducer:{
        store: sliceStoreReducer
    }
})

