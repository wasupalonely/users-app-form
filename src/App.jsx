import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import UsersList from "./components/UsersList";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto pt-6 pb-12">
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
