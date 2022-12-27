import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Apply from "../../pages/Apply";
import Admin from "../../pages/Admin";
import Home from "../../pages/Home";
import Data from "../../pages/Data";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";

const index = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" exact element={<Home />} />
          <Route path="/data" exact element={<Data />} />
          <Route path="/apply" exact element={<Apply />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* Member routes */}
          <Route path="/profil" exact element={<Profil />} />

          {/* Admin routes */}
          <Route path="/admin" exact element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
