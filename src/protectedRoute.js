import React from 'react'
import { Outlet } from 'react-router-dom';
import Auth from "./auth";

const protectedRoute = () => {
  return  Auth.isAuthenticated() === true ? (
    <Outlet />
  ) : ( window.location.href = "http://localhost:3000")
}

export default protectedRoute