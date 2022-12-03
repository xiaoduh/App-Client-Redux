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
import Job from "../../pages/Job";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";
import AddUser from "../../pages/AddUser";
import AddJob from "../../pages/AddJob";
import AddCompany from "../../pages/AddCompany";

const index = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" exact element={<Home />} />
          <Route path="/job" exact element={<Job />} />
          <Route path="/apply" exact element={<Apply />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* Member routes */}
          <Route path="/profil" exact element={<Profil />} />

          {/* Admin routes */}
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/add-user" exact element={<AddUser />} />
          <Route path="/add-job" exact element={<AddJob />} />
          <Route path="/add-company" exact element={<AddCompany />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
