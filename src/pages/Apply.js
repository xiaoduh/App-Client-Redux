import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import ApplyJobForm from "../components/Apply/ApplyJobForm";
import Footer from "../components/Footer";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";
import { useLocation } from "react-router-dom";

const Apply = () => {
  const uid = useContext(UidContext);
  const location = useLocation();
  const { state } = location;
  console.log(state.from);
  return (
    <>
      <div className="profil-page">
        {uid ? (
          <>
            <LeftNav />
            <ApplyJobForm job={state.from} />
          </>
        ) : (
          <div className="log-container">
            <Log signin={true} signup={false} />
            <div className="img-container">
              <img src="./img/log.svg" alt="img-log" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Apply;
