import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import NewComplaint from "./pages/NewComplaint";
import ComplaintDetail from "./pages/ComplaintDetail";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "1rem 2rem" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/complaints/new"
            element={
              <ProtectedRoute>
                <NewComplaint />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaints/:id"
            element={
              <ProtectedRoute>
                <ComplaintDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/agent/dashboard"
            element={
              <ProtectedRoute allowedRoles={["AGENT"]}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
