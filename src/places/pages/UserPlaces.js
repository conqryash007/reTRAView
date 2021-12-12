import React, { useState, useEffect } from "react";
import NavBar from "./../../shared/components/Navbar/Navbar";
import PlaceList from "./../components/PlaceList";
import { useHttp } from "./../../shared/hooks/http-hook";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserPlaces() {
  const [loadedPlace, setLoadedPlace] = useState([]);
  const userId = useParams().userId;
  const { loading, sendRequest, clearError } = useHttp();

  useEffect(() => {
    clearError();
    const fet = async () => {
      try {
        const plac = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/users/${userId}`
        );
        setLoadedPlace(plac.place);
      } catch (err) {}
    };
    fet();
  }, [sendRequest, clearError, userId]);

  return (
    <div>
      <NavBar></NavBar>
      {loading ? (
        <>
          <div
            style={{
              color: "white",
              textAlign: "center",
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -30%)",
              width: "400px",
              borderRadius: "5px",
              backgroundColor: "rgb(0,0,0,0.5)",
            }}
          >
            <CircularProgress sx={{ margin: "auto", width: "200px" }} />
            <h2>IN PROGRESS...</h2>
          </div>
        </>
      ) : null}
      {loading || <PlaceList items={loadedPlace} />}
    </div>
  );
}

// const dummy = [
//   {
//     id: "p1",
//     title: "2334sssdsdsdsdasdaf",
//     description: "gol gol sa hai thoda side se tuta hai. ",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
//     address: "sdsd 343434 pe sadasdsadekhe hai",
//     location: { lat: 41.890251, lng: 12.492373 },
//   },
//   {
//     id: "p2",
//     title: "2334sssdsdsdsdasdaf",
//     description: "gol gol sa hai tsdsdsddsdsda side se tuta hai. ",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
//     address: "sdsd 343434 pe sadasdsadekhe hai",
//     location: { lat: 0, lng: 0 },
//   },
//   {
//     id: "p3",
//     title: "Lucknow Uttar Pradesh",
//     description: "Muskuraiye aap Lucknow mein hai",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
//     address: "sdsd 343434 pe sadasdsadekhe hai",
//     location: { lat: 26.85, lng: 80.949997 },
//   },
// ];
