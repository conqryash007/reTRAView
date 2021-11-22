import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";

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
  const classes = useStyles();
  const { id, title, description, image, address, location } = props;
  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ maxHeight: "400px", overflow: "auto", textAlign: "center" }}>
        <CardMedia
          component="img"
          height="220"
          image={image}
          alt="user image"
        />
        <CardContent className={classes.root}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
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
          <Button size="small">VIEW ON MAP</Button>
          <Button size="small">EDIT</Button>
          <Button size="small">DELETE</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
