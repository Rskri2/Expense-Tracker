import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./components/UserPage";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/my-account" element={<UserPage />}></Route>
        </Route>
        <Route path="*" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
