import React, { useState, useContext } from "react";
import { AuthContext } from "./../../shared/context/auth-context";
import { makeStyles } from "@material-ui/core";
import Navbar from "../../shared/components/Navbar/Navbar";
import Input from "./../../shared/components/FormElements/Input";
import Button from "@material-ui/core/Button";
import { useHttp } from "./../../shared/hooks/http-hook";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "./../../shared/Utlis/validators";
import { useForm } from "./../../shared/hooks/form-hook";
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

export default function UpdatePlace() {
  const auth = useContext(AuthContext);
  const pid = useParams().placeId;
  const classes = useStyles();
  const navigate = useNavigate();
  // const auth = useContext(AuthContext);

  const handleClose = () => setOpen(false);

  const { loading, err, sendRequest, clearError } = useHttp();
  const [open, setOpen] = useState(false);

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

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setOpen(true);
    clearError();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${pid}`,
        "PATCH",
        JSON.stringify({
          title: formData.inputs.title.value,
          description: formData.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <Navbar />
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formData.isValid}
          >
            Update PLACE
          </Button>
        </div>
      </form>
    </>
  );
}
