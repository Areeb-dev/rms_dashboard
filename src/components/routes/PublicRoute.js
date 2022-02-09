import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import SignIn from "../drawer/SideDrawer";
import { Navigate } from 'react-router-dom';
const PublicRoute = () => {
    // let Navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Redirect to='/' /> */}
      <Route path="/" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default PublicRoute;