import { useSelector } from "react-redux";

function Display() {
    const currentCalc = useSelector(state => state.calculatorReducer.currentCalc);
    const output = useSelector(state => state.calculatorReducer.calcOutput);

    return (
        <div id="display">
            <span id="topLine">{currentCalc.join(" ")}</span>
            <br />
            <span id="bottomLine">{output.toString()}</span>
        </div>
    );
}

export default Display;