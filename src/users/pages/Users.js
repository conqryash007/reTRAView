import React from "react";
import Navbar from "../../shared/components/Navbar/Navbar";
import UserList from "../components/UserList";

export default function Users() {
  const data = [
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      name: "Yash Gupta",
      placeCount: 4,
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      name: "sdsd Gupta",
      placeCount: 4,
    },
    {
      id: 22,
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      name: "sdsd Gupta",
      placeCount: 4,
    },
    {
      id: 23,
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      name: "sdsd Gupta",
      placeCount: 4,
    },
    {
      id: 24,
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      name: "sdsd Gupta",
      placeCount: 4,
    },
    {
      id: 25,
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      name: "sdsd Gupta",
      placeCount: 4,
    },
  ];
  return (
    <>
      <Navbar />
      <UserList item={data} />
    </>
  );
}