import React from "react";
import PlaceItem from "./PlaceItem";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <Container>
        <h1>NO USER FOUND</h1>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: "1rem" }}>
      <Grid
        container
        colum={{ xs: 2, sm: 4, md: 12 }}
        spacing={{ xs: 2, md: 2 }}
      >
        {props.items.map((curr) => {
          return (
            <PlaceItem
              key={curr.id}
              image={curr.image}
              id={curr.id}
              title={curr.title}
              description={curr.description}
              address={curr.address}
              location={curr.location}
            ></PlaceItem>
          );
        })}
      </Grid>
    </Container>
  );
}
