import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [token, setToken] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .post("http://localhost:8000/ChatBot")
      .then((response) => {
        console.log(response.data.authenticate, "Authentication Response");
        setToken(response.data.authenticate);
      })
      .catch((error) => {
        console.error("Error during authentication check:", error);
        setToken(false);
      });
  }, []); 
  if (token === null) {
    return <div>Loading...</div>;
  }

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
