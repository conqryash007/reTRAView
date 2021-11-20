import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

export default function UserItem(props) {
  const classes = useStyles();
  const { id, image, name, placeCount } = props;
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ maxWidth: 210 }}>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="user image"
        />
        <CardContent className={classes.root}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ color: "white" }}
          >
            ID : {id}
            <br />
            Places : {placeCount}
          </Typography>
        </CardContent>
        <CardActions className={classes.root2}>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
