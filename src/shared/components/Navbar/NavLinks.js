import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./../../context/auth-context";

export default function NavLinks() {
  const auth = useContext(AuthContext);

  return (
    <>
      <NavLink to="/">
        <Button color="inherit">ALL USER</Button>
      </NavLink>
      {auth.isLoggedIn && (
        <NavLink to={`/${auth.userId}/places`}>
          <Button color="inherit">MY PLACES</Button>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to="/places/new">
          <Button color="inherit">ADD PLACE</Button>
        </NavLink>
      )}
      {!auth.isLoggedIn && (
        <NavLink to="/auth">
          <Button color="inherit">Authentication</Button>
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to="/auth">
          <Button onClick={auth.logOut} color="inherit">
            Log Out
          </Button>
        </NavLink>
      )}
    </>
  );
}
