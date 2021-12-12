import React, { useEffect, useState } from "react";
import Navbar from "../../shared/components/Navbar/Navbar";
import UserList from "../components/UserList";
import { useHttp } from "./../../shared/hooks/http-hook";
import CircularProgress from "@mui/material/CircularProgress";

export default function Users() {
  const [data, setData] = useState([]);
  const { loading, sendRequest, clearError } = useHttp();

  useEffect(() => {
    clearError();
    const fetchUser = async () => {
      try {
        const userData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setData(userData.users);
      } catch (err) {
        console.log("Error in user");
      }
    };
    fetchUser();
  }, [sendRequest, clearError]);

  return (
    <>
      <Navbar />
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
            <h2>LOADING...</h2>
          </div>
        </>
      ) : null}
      <UserList item={data} />
    </>
  );
}
