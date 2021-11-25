import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const style = {
  color: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgb(2, 6, 41)",
  border: "2px solid rgb(255,0,0)",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {
  const { modalOpen, handlemodalClose } = props;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handlemodalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to DELETE the place!
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              The places removed cannot be reverted back.
            </Typography>
            <Stack direction="row" spacing={2} style={{ marginTop: "1rem" }}>
              <Button
                variant="outlined"
                onClick={handlemodalClose}
                size="small"
              >
                CANCEL
              </Button>
              <Button
                variant="outlined"
                onClick={handlemodalClose}
                size="small"
                color="error"
              >
                DELETE
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
