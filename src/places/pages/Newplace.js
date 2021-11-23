import React from "react";
import Navbar from "../../shared/components/Navbar/Navbar";
import Input from "./../../shared/components/FormElements/Input";

export default function Users() {
  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", color: "white" }}>Add New Place</h1>
      <Input></Input>
    </>
  );
}
