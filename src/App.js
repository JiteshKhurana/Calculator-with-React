import { useReducer } from "react";
import "./App.css";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          secondOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.secondOperand === "0") return state;
      if (payload.digit === "." && state?.secondOperand?.includes("."))
        return state;
      return {
        ...state,
        secondOperand: `${state.secondOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.secondOperand == null && state.firstOperand == null)
        return state;
      if (state.secondOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.firstOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          firstOperand: state.secondOperand,
          secondOperand: null,
        };
      }
      return {
        ...state,
        firstOperand: evaluate(state),
        operation: payload.operation,
        secondOperand: null,
      };
    case ACTIONS.EVALUATE:
      if (
        state.firstOperand == null ||
        state.secondOperand == null ||
        state.operation == null
      )
        return state;

      return {
        ...state,
        overwrite: true,
        firstOperand: null,
        secondOperand: evaluate(state),
        operation: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          secondOperand: null,
        };
      if (state.secondOperand == null) return state;
      if (state.secondOperand.length === 1) {
        return { ...state, secondOperand: null };
      }
      return { ...state, secondOperand: state.secondOperand.slice(0, -1) };

    default:
      return state;
  }
}

function evaluate({ firstOperand, operation, secondOperand }) {
  const first = parseFloat(firstOperand);
  const second = parseFloat(secondOperand);
  if (isNaN(first) || isNaN(second)) return "";
  let ans = "";
  switch (operation) {
    case "÷":
      ans = first / second;
      break;
    case "*":
      ans = first * second;
      break;
    case "-":
      ans = first - second;
      break;
    case "+":
      ans = first + second;
      break;
    default:
      ans = 0;
  }
  return ans.toString();
}

function App() {
  const [{ firstOperand, secondOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  const btns = [
    "÷",
    "1",
    "2",
    "3",
    "*",
    "4",
    "5",
    "6",
    "+",
    "7",
    "8",
    "9",
    "-",
    ".",
    "0",
  ];
  return (
    <div className="App">
      <h1 className="text-center text-4xl mt-5">Occult Gurukul Calculator</h1>
      <div className="grid mt-8 grid-cols-4 grid-rows gap-x-2 gap-y-5 mx-96 bg-cyan-400 rounded-3xl p-10  border-black border-2 justify-center">
        <div className="col-span-full	bg-slate-500 text-white p-5 h-20 rounded-3xl  border-2 border-black text-3xl text-end overflow-auto">
          {firstOperand} {operation} {secondOperand}
        </div>
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          className="col-span-2 border-2 border-black rounded-3xl text-3xl hover:bg-violet-500 bg-violet-400"
        >
          AC
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          className="border-2 border-black rounded-3xl text-3xl hover:bg-violet-500 bg-violet-400"
        >
          DEL
        </button>
        {btns.map((btn, id) =>
          btn === "÷" || btn === "+" || btn === "-" || btn === "*" ? (
            <OperationButton key={id} dispatch={dispatch} operation={btn} />
          ) : (
            <DigitButton key={id} dispatch={dispatch} digit={btn} />
          )
        )}
        <button
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          className="col-span-2 border-2 border-black rounded-3xl text-3xl hover:bg-violet-500 bg-violet-400"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
