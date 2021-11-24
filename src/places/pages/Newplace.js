import React, { useCallback, useReducer } from "react";
import { makeStyles } from "@material-ui/core";
import Input from "./../../shared/components/FormElements/Input";
import Button from "@material-ui/core/Button";
import Navbar from "./../../shared/components/Navbar/Navbar";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "./../../shared/Utlis/validators";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      backgroundColor: "rgb(255, 255, 255)",
      margin: theme.spacing(1),
      width: "40vw",
      minWidth: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

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

const Form = () => {
  const classes = useStyles();

  const [formData, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({ type: "INPUT_CHANGE", value: value, inputId: id, isValid });
    },
    [dispatch]
  );
  return (
    <>
      <Navbar></Navbar>
      {console.log(formData)}
      <h1 style={{ textAlign: "center", color: "white" }}>Add New Place</h1>
      <form className={classes.root}>
        <Input
          label="Title"
          name="title"
          type="text"
          validator={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        ></Input>
        <Input
          label="Description"
          name="description"
          type="text"
          validator={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <div>
          <Button variant="contained" type="reset">
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formData.isValid}
          >
            Signup
          </Button>
        </div>
      </form>
    </>
  );
};
export default Form;
