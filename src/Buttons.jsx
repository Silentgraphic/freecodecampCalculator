import { useDispatch } from "react-redux";
import { addToCalc, clearCalc, submitCalc, updateDisplay } from "./slices/calculator";

function Buttons() {
    const dispatch = useDispatch();

    return (
        <div id="buttons">
            <div id="numButtons">
                <button id="one" className="nums" onClick={() => dispatch(addToCalc("1"))}>1</button>
                <button id="two" className="nums" onClick={() => dispatch(addToCalc("2"))}>2</button>
                <button id="three" className="nums" onClick={() => dispatch(addToCalc("3"))}>3</button>
                <button id="four" className="nums" onClick={() => dispatch(addToCalc("4"))}>4</button>
                <button id="five" className="nums" onClick={() => dispatch(addToCalc("5"))}>5</button>
                <button id="six" className="nums" onClick={() => dispatch(addToCalc("6"))}>6</button>
                <button id="seven" className="nums" onClick={() => dispatch(addToCalc("7"))}>7</button>
                <button id="eight" className="nums" onClick={() => dispatch(addToCalc("8"))}>8</button>
                <button id="nine" className="nums" onClick={() => dispatch(addToCalc("9"))}>9</button>
                <button id="zero" className="nums" onClick={() => dispatch(addToCalc("0"))}>0</button>
            </div>
            <div id="operatorButtons">
                <button id="clear" className="operators" onClick={() => dispatch(clearCalc())}>AC</button>
                <button id="add" className="operators" onClick={() => dispatch(addToCalc("+"))}>+</button>
                <button id="subtract" className="operators" onClick={() => dispatch(addToCalc("-"))}>-</button>
                <button id="multiply" className="operators" onClick={() => dispatch(addToCalc("*"))}>*</button>
                <button id="divide" className="operators" onClick={() => dispatch(addToCalc("/"))}>/</button>
                <button id="decimal" className="operators" onClick={() => dispatch(addToCalc("."))}>.</button>
            </div>
            <button id="equals" onClick={() => {
                dispatch(submitCalc());
                dispatch(updateDisplay());
            }}> = </button>
        </div >
    );
}

export default Buttons;