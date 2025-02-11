import React from "react";
import { Routes, Route } from "react-router-dom";
import ChangePassword from "./pages/change-password/change-password";
import AdminDashboard from "./dashboard/AdminDashboard";
import Login from "./pages/Login/Login";
import "../src/styles/GlobalStyles";
import Reset from "./pages/Reset";
import SignUp from "./signUp/SignUp";
import ViewUnit from "./dashboard/Viewunit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ViewMore from "./dashboard/ViewMore";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
        <Route path="/forgotPassword" element={<Reset />} />
        <Route path="/viewUnit" element={<ViewUnit />} />
        {/* <Route path="/viewMore" element={<ViewMore />} /> */}
      </Routes>
      {/* 
      <UploadForm /> */}
    </>
  );
}

export default App;
