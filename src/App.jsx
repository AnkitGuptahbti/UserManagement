import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EditUser from "./views/EditUser";
import CreateUser from "./views/CreateUser";
import Login from "./auth/Login";
import PrivateRoute from "./routes/PrivateRoute";
export default function App() {
  return (
    <Router>

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
