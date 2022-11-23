import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Apply from "../../pages/Apply";
import Home from "../../pages/Home";
import Job from "../../pages/Job";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";

const index = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/profil" exact element={<Profil />} />
          <Route path="/job" exact element={<Job />} />
          <Route path="/apply" exact element={<Apply />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
