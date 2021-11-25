import React from "react";
import NavBar from "./../../shared/components/Navbar/Navbar";
import PlaceList from "./../components/PlaceList";

export default function UserPlaces() {
  const dummy = [
    {
      id: "p1",
      title: "2334sssdsdsdsdasdaf",
      description: "gol gol sa hai thoda side se tuta hai. ",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
      address: "sdsd 343434 pe sadasdsadekhe hai",
      location: { lat: 41.890251, lng: 12.492373 },
    },
    {
      id: "p2",
      title: "2334sssdsdsdsdasdaf",
      description: "gol gol sa hai tsdsdsddsdsda side se tuta hai. ",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
      address: "sdsd 343434 pe sadasdsadekhe hai",
      location: { lat: 0, lng: 0 },
    },
    {
      id: "p3",
      title: "Lucknow Uttar Pradesh",
      description: "Muskuraiye aap Lucknow mein hai",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
      address: "sdsd 343434 pe sadasdsadekhe hai",
      location: { lat: 26.85, lng: 80.949997 },
    },
  ];
  return (
    <div>
      <NavBar></NavBar>
      <PlaceList items={dummy} />
    </div>
  );
}
