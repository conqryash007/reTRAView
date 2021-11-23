import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Map from "./../../shared/components/Maps/Map";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vh",
  height: "70vh",
  bgcolor: "#353638",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#352e3d",
    color: "white",
  },
  root2: {
    backgroundColor: "#4c3569",
  },
}));

export default function PlaceItem(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const { id, title, description, image, address, location } = props;
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Map
              style={{ height: "100vh", width: "100vh" }}
              center={location}
              zoom={10}
            />
          </Box>
        </Modal>
      </div>
      <Grid item xs={12} sm={4} md={4}>
        <Card
          sx={{ maxHeight: "400px", overflow: "auto", textAlign: "center" }}
        >
          <CardMedia
            component="img"
            height="220"
            image={image}
            alt="user image"
          />
          <CardContent className={classes.root}>
            <Typography gutterBottom variant="h5" component="div">
              {id}. {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ color: "white" }}
            >
              {address}
              <br />
              {description}
            </Typography>
          </CardContent>
          <CardActions className={classes.root2}>
            <Button size="small" onClick={handleOpen}>
              VIEW ON MAP
            </Button>
            <Button size="small">EDIT</Button>
            <Button size="small">DELETE</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
