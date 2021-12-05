import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Navbar from "../../shared/components/Navbar/Navbar";
import Input from "./../../shared/components/FormElements/Input";
import Button from "@material-ui/core/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from "./../../shared/Utlis/validators";
import { useForm } from "./../../shared/hooks/form-hook";
import { AuthContext } from "./../../shared/context/auth-context";

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

export default function Auth() {
  const auth = useContext(AuthContext);

  const classes = useStyles();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "title from place in db",
        isValid: false,
      },
      password: {
        value: "description from place in db",
        isValid: false,
      },
    },
    true
  );

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            name: formData.inputs.name.value,
            password: formData.inputs.password.value,
            email: formData.inputs.email.value,
          }),
        });
        const resData = await response.json();
        console.log(resData);
      } catch (err) {
        console.log(err);
      }
    }
    auth.logIn();
  };

  const switchForm = () => {
    if (!isLogin) {
      setFormData(
        { ...formData, name: undefined },
        formData.inputs.email.isvalid && formData.inputs.password.isvalid
      );
    } else {
      setFormData(
        { ...formData.inputs, name: { value: "", isValid: false } },
        false
      );
    }
    setIsLogin((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", color: "white" }}>
        USER AUTHENTICATION
      </h1>
      <form className={classes.root} onSubmit={submitFormHandler}>
        {!isLogin && (
          <Input
            label="Name"
            name="name"
            type="text"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            val={formData.email}
          ></Input>
        )}
        <Input
          label="Email"
          name="email"
          type="text"
          validator={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          val={formData.email}
        ></Input>
        <Input
          label="Password"
          name="password"
          type="password"
          validator={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          val={formData.password}
        />
        <div>
          <Button variant="contained" type="reset" onClick={switchForm}>
            Switch to {isLogin ? "Sign Up" : "Log In"}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formData.isValid}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </Button>
        </div>
      </form>
    </>
  );
}
