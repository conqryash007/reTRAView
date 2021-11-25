import React from "react";
import Users from "./users/pages/Users";
import Newplace from "./places/pages/Newplace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} exact></Route>
      <Route path="/places/new" element={<Newplace />} exact></Route>
      <Route path="/:userId/places" element={<UserPlaces />} exact></Route>
      <Route path="/places/:placeId" element={<UpdatePlace />} exact></Route>
    </Routes>
  );
}

export default App;
