import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
