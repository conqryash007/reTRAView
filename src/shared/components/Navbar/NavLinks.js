import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

import React from "react";

export default function NavLinks() {
  return (
    <>
      <NavLink to="/">
        <Button color="inherit">ALL USER</Button>
      </NavLink>
      <NavLink to="/u1/places">
        <Button color="inherit">MY PLACES</Button>
      </NavLink>
      <NavLink to="/places/new">
        <Button color="inherit">ADD PLACE</Button>
      </NavLink>
      <NavLink to="/auth">
        <Button color="inherit">Authentication</Button>
      </NavLink>
    </>
  );
}
