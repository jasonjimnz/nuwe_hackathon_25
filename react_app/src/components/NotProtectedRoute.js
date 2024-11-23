import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function NotProtectedRoute({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default NotProtectedRoute;
