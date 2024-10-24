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
            const lastItem = state.currentCalc[state.currentCalc.length - 1];
            if ((parseInt(action.payload) || action.payload === ".") && (parseInt(lastItem[0]) || lastItem === "")) {
                if (lastItem[lastItem.length - 4] !== ".") state.currentCalc[state.currentCalc.length - 1] += action.payload;
            } else if (lastItem !== "") {
                state.currentCalc.push(action.payload);
            }
        },
        clearCalc: (state) => { state.currentCalc = [""]; },
        submitCalc: (state) => {
            state.calcOutput = calculate(state);
            state.currentCalc = [state.calcOutput];
            console.log(state.calcOutput);
        }
    }
});

export const { addToCalc, clearCalc, submitCalc } = calculatorSlice.actions;

export default calculatorSlice.reducer;