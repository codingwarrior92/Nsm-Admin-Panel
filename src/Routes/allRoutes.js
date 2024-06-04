import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import CoinMgt from "../pages/CoinAnalyzer/CoinMgt";
import CoinGraph from "../pages/CoinAnalyzer/CoinGraph";
import ClientSetting from "../pages/NewsMgt/ClientSetting";
import KeywordSetting from "../pages/NewsMgt/KeywordSetting";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

const authProtectedRoutes = [
  { path: "/coin-management", component: <CoinMgt /> },
  { path: "/coin-graph", component: <CoinGraph /> },

  { path: "/client-setting", component: <ClientSetting /> },
  { path: "/keyword-setting", component: <KeywordSetting /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };