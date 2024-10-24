import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCalc: [""],
    calcOutput: 0
};

function calculate(state) {
    const calcArry = state.currentCalc;
    return calcArry.reduce((acc, val, index) => {
        const nextVal = parseFloat(calcArry[index + 1]);
        switch (val[0]) {
            case "+":
                acc += nextVal;
                break;
            case "-":
                acc -= nextVal;
                break;
            case "/":
                acc /= nextVal;
                break;
            case "*":
                acc *= nextVal;
                break;
            default:
                break;
        }
        return acc;
    }, parseFloat(calcArry[0]));
}

const calculatorSlice = createSlice({
    name: "calculatorSlice",
    initialState,
    reducers: {
        addToCalc: (state, action) => {
            if (state.calcOutput != 0 && state.currentCalc[0] === "") {
                state.currentCalc[0] = state.calcOutput;
            }

            const lastItem = state.currentCalc[state.currentCalc.length - 1];

            if (!parseInt(action.payload) && action.payload != "." && parseInt(state.currentCalc[0]) && parseInt(lastItem)) {
                state.currentCalc.push(action.payload);
            } else if (parseInt(action.payload) || action.payload === "." && state.calcOutput === 0) {
                if (!parseInt(lastItem) && parseInt(state.currentCalc[0])) { state.currentCalc.push(action.payload); }
                else if (lastItem[lastItem.length - 4] !== ".") state.currentCalc[state.currentCalc.length - 1] += action.payload;
            }
            state.calcOutput = 0;
        },
        clearCalc: (state) => { state.currentCalc = [""]; state.calcOutput = 0; },
        submitCalc: (state) => {
            state.calcOutput = calculate(state);
            state.currentCalc = [""];
        }
    }
});

export const { addToCalc, clearCalc, submitCalc } = calculatorSlice.actions;

export default calculatorSlice.reducer;