import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import Input from "./../../shared/components/FormElements/Input";
import Button from "@material-ui/core/Button";
import Navbar from "./../../shared/components/Navbar/Navbar";
import { VALIDATOR_REQUIRE } from "./../../shared/Utlis/validators";

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

const Form = () => {
  const classes = useStyles();
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);
  return (
    <>
      <Navbar></Navbar>
      <h1 style={{ textAlign: "center", color: "white" }}>Add New Place</h1>
      <form className={classes.root}>
        <Input
          label="Title"
          type="text"
          validator={[VALIDATOR_REQUIRE()]}
          onInput={titleInputHandler}
        ></Input>
        <Input
          label="Last Name"
          type="text"
          validator={[VALIDATOR_REQUIRE()]}
        />
        <Input label="Email" type="email" validator={[VALIDATOR_REQUIRE()]} />
        <Input
          label="Password"
          type="password"
          validator={[VALIDATOR_REQUIRE()]}
        />
        <div>
          <Button variant="contained" type="reset">
            Reset
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </div>
      </form>
    </>
  );
};
export default Form;
