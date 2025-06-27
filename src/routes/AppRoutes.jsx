// central route

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import PrivateRoute from "./PrivateRoute";
import UserForm from "../views/users/UserForm";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
        </Route>

        <Route
          path="*"
          element={<div className="text-center mt-10">404 Not Found</div>}
        />
      </Routes>
    </Router>
  );
}
