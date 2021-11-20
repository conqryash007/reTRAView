import React from "react";
import UserItem from "./UserItem";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function UserList(props) {
  return (
    <Container style={{ marginTop: "1rem" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 2, sm: 4, md: 12 }}
      >
        {props.item.map((curr) => (
          <UserItem
            key={curr.id}
            id={curr.id}
            image={curr.image}
            name={curr.name}
            placeCount={curr.placeCount}
          />
        ))}
      </Grid>
    </Container>
  );
}
