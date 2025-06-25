// central route

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import EditUser from "../views/UserEdit";
import CreateUser from "../views/UserCreate";
import Login from "../views/Login";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Route>

        <Route
          path="*"
          element={<div className="text-center mt-10">404 Not Found</div>}
        />
      </Routes>
    </Router>
  );
}
