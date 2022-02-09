import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import SideBar from "../drawer/SideDrawer";
import { Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  
  return (
    <Routes>
      <Route path="/dashboard" element={<SideBar />} />
      {/* <Redirect to='/dashboard' /> */}
      <Route path="/" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default PrivateRoute;