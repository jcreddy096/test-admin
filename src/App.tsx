import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/users/Layout";
import UserListPage from "./pages/users/UserListPage";
import AddUserPage from "./pages/users/AddUserPage";
import EditUserPage from "./pages/users/EditUserPage";
import UserDelete from "./pages/users/UserDelete";

const App = () => {
  return (
    <Router>
      
          <Routes>

            <Route path="/" element={<Layout />}> 
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/add" element={<AddUserPage />} />
            <Route path="/users/edit/:id" element={<EditUserPage />} />
            <Route path="/users/delete/:id" element={<UserDelete />} />
            </Route>
            
          </Routes>

        
    </Router>
  );
};

export default App;
