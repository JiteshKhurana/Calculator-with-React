import React from "react";
import { ACTIONS } from "../App";

const DigitButton = ({ dispatch, digit }) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.ADD_DIGIT,
          payload: { digit: digit },
        })
      }
      className="border-black border-2 rounded-3xl w-30 h-20 text-3xl hover:bg-purple-500 bg-purple-400"
    >
      {digit}
    </button>
  );
};

export default DigitButton;
