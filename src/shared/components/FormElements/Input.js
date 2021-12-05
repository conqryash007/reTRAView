import React, { useReducer, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { validate } from "./../../Utlis/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validator),
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};

export default function Input(props) {
  const { label, type, validator, onInput, name, val } = props;
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouch: false,
  });
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(name, value, isValid);
  }, [name, value, isValid, onInput]);

  const inputHandler = (e) => {
    dispatch({ val: e.target.value, type: "CHANGE", validator: validator });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  return (
    <>
      <TextField
        label={label}
        variant="filled"
        required
        type={type}
        error={!inputState.isValid && inputState.isTouch}
        onChange={inputHandler}
        onBlur={touchHandler}
        value={val}
      />
    </>
  );
}
