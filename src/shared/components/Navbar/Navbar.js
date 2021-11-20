import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import Sidedrawer from "./Sidedrawer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  style: {
    backgroundColor: "#000000",
  },
}));

const Navbar = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const classes = useStyles();
  return (
    <>
      <Sidedrawer tDrawer={toggleDrawer} st={state} />
      <AppBar position="static">
        <Toolbar className={classes.style}>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            edge="start"
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Project Noname
          </Typography>
          <NavLinks />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
