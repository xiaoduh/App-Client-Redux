import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Footer from "../components/Footer";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";

const Job = () => {
  const uid = useContext(UidContext);
  return (
    <>
      <div className="profil-page">
        {uid ? (
          <>
            <LeftNav />
            <h1>Job</h1>
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

export default Job;
