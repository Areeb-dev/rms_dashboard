import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../drawer/SideDrawer";
import SignIn from "../signIn/SignIn";
// import PrivateRoute from "./ProtectedRoute"

function Routing() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<SideBar />} />
      </Routes>
    </>
  );
}
export default Routing;
