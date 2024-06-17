import { Route, Routes } from "react-router-dom";
import { HomePage, DashboardPage, LoginPage, RegisterPage } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
      </Routes>
    </>
  );
};
