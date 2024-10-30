import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCalc: [""],
    calcOutput: 0,
    displayOutput: 0
};

function calculate(state) {
    const calcArry = state.currentCalc;
    return calcArry.reduce((acc, val, index) => {
        const nextVal = parseFloat(calcArry[index + 1]);
        const prevVal = calcArry[index - 1];
        switch (val[0]) {
            case "+":
                acc += nextVal;
                break;
            case "-":
                if (isNaN(prevVal)) break;
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
            //TODO fix this mess

            //Check if this is the second calculation
            if (state.calcOutput != 0 && state.currentCalc[0] === "") {
                //If user clicked on operator add to previous calculation otherwise reset
                if (parseInt(action.payload)) state.currentCalc[0] = action.payload;
                else {
                    state.currentCalc[0] = state.calcOutput;
                    state.currentCalc.push(action.payload);
                }
            } else {
                const lastItem = state.currentCalc[state.currentCalc.length - 1];
                const lastLastItem = state.currentCalc[state.currentCalc.length - 2];

                //Check if pressed key is NaN or a . and add to calculation
                if (isNaN(action.payload) && state.currentCalc[0] != "") {
                    //Allow negative numbers to be added
                    if (isNaN(lastItem) && action.payload === "-" && lastItem != "-") state.currentCalc.push(action.payload);
                    else if (lastItem != action.payload) {
                        //Check if there is atleast one . in number
                        if (action.payload === "." && (lastItem.match(/\./g) || []).length === 0) state.currentCalc[state.currentCalc.length - 1] += action.payload;
                        else if (isNaN(lastItem)) {
                            if (lastItem === "-" && isNaN(lastLastItem)) state.currentCalc.pop();
                            state.currentCalc[state.currentCalc.length - 1] = action.payload;
                        }
                        else if (action.payload != ".") state.currentCalc.push(action.payload);
                    }
                } else if (!isNaN(action.payload)) {
                    //check if item send is an operator or first item is a num
                    if (action.payload === "0" && lastItem[0] === "0") return;
                    if (!isNaN(lastItem) && lastItem[lastItem.length - 4] !== ".") state.currentCalc[state.currentCalc.length - 1] += action.payload;
                    else if (lastItem === "-" && isNaN(lastLastItem)) state.currentCalc[state.currentCalc.length - 1] += action.payload;
                    else if (!isNaN(state.currentCalc[0])) state.currentCalc.push(action.payload);
                }
            }
            state.calcOutput = 0;
        },
        clearCalc: (state) => { state.currentCalc = [""]; state.calcOutput = 0; },
        submitCalc: (state) => {
            if (state.currentCalc[0] != "") state.calcOutput = calculate(state);
            state.currentCalc = [""];
        },
        updateDisplay: (state) => {
            if (state.calcOutput === 0 && state.currentCalc[0] != "") state.displayOutput = state.currentCalc.join(" ");
            else state.displayOutput = state.calcOutput;
        }
    }
});

export const { addToCalc, clearCalc, submitCalc, updateDisplay } = calculatorSlice.actions;

export default calculatorSlice.reducer;