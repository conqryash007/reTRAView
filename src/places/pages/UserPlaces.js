import React from "react";
import NavBar from "./../../shared/components/Navbar/Navbar";
import PlaceList from "./../components/PlaceList";

export default function UserPlaces() {
  const dummy = [
    {
      id: "p1",
      title: "2334sssdsdsdsdasdaf",
      description: "gol gol sa hai thoda side se tuta hai. khodki bhi hai",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
      address: "sdsd 343434 pe sadasdsadekhe hai",
      location: { lat: 41.890251, lng: 12.492373 },
    },
    {
      id: "p2",
      title: "2334sssdsdsdsdasdaf",
      description:
        "gol gol sa hai tsdsdsddsdsda side se tuta hai. khodki bhi hai",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
      address: "sdsd 343434 pe sadasdsadekhe hai",
      location: { lat: 41.890251, lng: 12.492373 },
    },
    {
      id: "p3",
      title: "2334sssdsdsdsdasdaf",
      description: "gol gol sa hai thoda side se tuta hai. khodki bhi hai",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Roma06%28js%29.jpg",
      address: "sdsd 343434 pe sadasdsadekhe hai",
      location: { lat: 41.890251, lng: 12.492373 },
    },
  ];
  return (
    <div>
      <NavBar></NavBar>
      <PlaceList items={dummy} />
    </div>
  );
}
