import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let isFormValid = true;
      for (let inputId in state.inputs) {
        if (inputId === action.inputId) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: isFormValid,
      };
    default:
      return state;
  }
};

export const useForm = (initInput, initVal) => {
  const [formData, dispatch] = useReducer(formReducer, {
    inputs: initInput,
    isValid: initVal,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value: value, inputId: id, isValid });
  }, []);

  return [formData, inputHandler];
};
