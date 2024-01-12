import React from "react";
import { ACTIONS } from "../App";

const OperationButton = ({ dispatch, operation }) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operation: operation },
        })
      }
      className="border-black border-2 rounded-3xl w-30 h-20 text-3xl hover:bg-purple-500 bg-purple-400"
    >
      {operation}
    </button>
  );
};

export default OperationButton;
