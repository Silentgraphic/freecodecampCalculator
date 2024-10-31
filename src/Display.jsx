import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateDisplay } from "./slices/calculator";

function Display() {
    const dispatch = useDispatch();
    const currentCalc = useSelector(state => state.calculatorReducer.currentCalc);
    const output = useSelector(state => state.calculatorReducer.displayOutput);

    useEffect(() => {
        dispatch(updateDisplay());
    }, [currentCalc, dispatch]);

    return (
        <div id="actualDisplay">
            <span id="topLine">{currentCalc[0] === "" ? "0" : currentCalc.join(" ")}</span>
            <br />
            <span id="display">{output.toString()}</span>
        </div>
    );
}

export default Display;