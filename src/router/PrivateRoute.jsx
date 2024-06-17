import { Navigate } from "react-router-dom";
import api from "../utils/api";

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  const ensureTokenIsValid = async () => {
    return api("POST", "auth", null)
      .then((response) => {
        localStorage.setItem("userId", response.id);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.reload();
      });
  };

  ensureTokenIsValid();
  return children;
};
