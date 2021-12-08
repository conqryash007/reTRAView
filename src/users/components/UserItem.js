import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import { AuthContext } from "./../../shared/context/auth-context";
import { NavLink } from "react-router-dom";

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
  const auth = React.useContext(AuthContext);

  const classes = useStyles();
  const { id, image, name, placeCount } = props;
  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ maxWidth: "350px" }}>
        <CardMedia
          component="img"
          height="220"
          image={`http://localhost:5000/${image}`}
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
        {auth.isLoggedIn && (
          <CardActions className={classes.root2}>
            <NavLink to={`/${id}/places`}>
              <Button>Check Places</Button>
            </NavLink>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
