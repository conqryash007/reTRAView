import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function TemporaryDrawer(props) {
  const list = () => (
    <Box
      role="presentation"
      onClick={props.tDrawer(false)}
      onKeyDown={props.tDrawer(false)}
    >
      <List>
        <ListItem>
          <NavLink to="/">
            <Button color="inherit">ALL USER</Button>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/u1/places">
            <Button color="inherit">MY PLACES</Button>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/places/new">
            <Button color="inherit">ADD PLACE</Button>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/auth">
            <Button color="inherit">Authentication</Button>
          </NavLink>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        {/* <Button onClick={toggleDrawer(true)}>toggle</Button> */}
        <Drawer open={props.st} onClose={props.tDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
