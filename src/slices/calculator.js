import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCalc: [],
    calcOutput: 0
};

function calculate(state) {
    const test = state.currentCalc;
    console.log(test.toString());
}

const calculatorSlice = createSlice({
    name: "calculatorSlice",
    initialState,
    reducers: {
        addToCalc: (state, action) => { state.currentCalc.push(action.payload); },
        clearCalc: (state) => { state.currentCalc = []; },
        submitCalc: (state) => { calculate(state); }
    }
});

export const { addToCalc, clearCalc, submitCalc } = calculatorSlice.actions;

export default calculatorSlice.reducer;