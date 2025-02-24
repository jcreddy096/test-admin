
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./layout/users/Layout";
import UserListPage from "./pages/users/UserListPage";
import AddUserPage from "./pages/users/AddUserPage";
import EditUserPage from "./pages/users/EditUserPage";
import LoginPage from "./login/LoginPage";
import { getToken } from "./utils/AuthUtils";
import ProfilePage from "./profile/users/Profilepage";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return getToken() ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    
    <Router>
    <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />
          <Route path="profile" element={<ProfilePage />} />

         </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    
  );
};

export default App;
