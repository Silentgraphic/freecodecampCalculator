import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./slices/calculator";

export default configureStore({
    reducer: { calculatorReducer }
});