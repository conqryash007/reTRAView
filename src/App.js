import React from "react";
import Users from "./users/pages/Users";
import Newplace from "./places/pages/Newplace";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} exact></Route>
      <Route path="/places/new" element={<Newplace />} exact></Route>
      {/* <useNavigate to="/"></useNavigate> */}
    </Routes>
  );
}

export default App;
