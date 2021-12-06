import React, { useContext, useState } from "react";
import { AuthContext } from "./../../shared/context/auth-context";
import { makeStyles } from "@material-ui/core";
import Input from "./../../shared/components/FormElements/Input";
import Button from "@material-ui/core/Button";
import Navbar from "./../../shared/components/Navbar/Navbar";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "./../../shared/Utlis/validators";
import { useForm } from "./../../shared/hooks/form-hook";
import { useHttp } from "./../../shared/hooks/http-hook";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  textAlign: "center",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
  const handleClose = () => setOpen(false);

  const { loading, err, sendRequest, clearError } = useHttp();
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);
  const classes = useStyles();

  const [formData, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const navigate = useNavigate();
  const submitFormHandler = async (e) => {
    e.preventDefault();
    setOpen(true);
    clearError();
    try {
      await sendRequest(
        "http://localhost:5000/api/places",
        "POST",
        JSON.stringify({
          title: formData.inputs.title.value,
          description: formData.inputs.description.value,
          address: formData.inputs.address.value,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <Navbar></Navbar>
      <h1 style={{ textAlign: "center", color: "white" }}>Add New Place</h1>
      <Modal
        onClose={handleClose}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <>
              <CircularProgress sx={{ margin: "auto", width: "200px" }} />
              <h2>IN PROGRESS...</h2>
            </>
          ) : null}
          {open && err}
          {err && <h1>Please try again.</h1>}
        </Box>
      </Modal>
      <form className={classes.root} onSubmit={submitFormHandler}>
        <Input
          label="Title"
          name="title"
          type="text"
          validator={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        ></Input>
        <Input
          label="Address"
          name="address"
          type="text"
          validator={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          validator={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />

        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formData.isValid}
          >
            Add Place
          </Button>
        </div>
      </form>
    </>
  );
};
export default Form;
