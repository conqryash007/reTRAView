import React from "react";
import { makeStyles } from "@material-ui/core";
import Navbar from "../../shared/components/Navbar/Navbar";
import Input from "./../../shared/components/FormElements/Input";
import Button from "@material-ui/core/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "./../../shared/Utlis/validators";
import { useForm } from "./../../shared/hooks/form-hook";

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

export default function UpdatePlace() {
  const classes = useStyles();

  const [formData, inputHandler] = useForm(
    {
      title: {
        value: "title from place in db",
        isValid: false,
      },
      description: {
        value: "description from place in db",
        isValid: false,
      },
    },
    true
  );

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", color: "white" }}>Update Place</h1>
      <form className={classes.root} onSubmit={submitFormHandler}>
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
}
