import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/Login';  // 🆕 IMPORT
import Dashboard from '../pages/Dashboard';
import Requests from '../pages/Requests';
import RequestDetails from '../pages/RequestDetails';
import ActivityLogs from '../pages/ActivityLogs';
import AdminUsers from '../pages/AdminUsers';
import Settings from '../pages/Settings';
import AdminProfile from '../pages/AdminProfile';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* 🆕 ADMIN LOGIN ROUTE — walang layout (walang sidebar) */}
      <Route path="/login" element={<Login />} />

      {/* Lahat ng ibang routes ay may AdminLayout (may sidebar) */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="requests/:id" element={<RequestDetails />} />
        <Route path="activity-logs" element={<ActivityLogs />} />
        
        <Route 
          path="users" 
          element={
            <ProtectedRoute requiredRole="super_admin">
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;