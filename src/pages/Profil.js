import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";
import Footer from "../components/Footer";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <>
      <div className="profil-page">
        {uid ? (
          <UpdateProfil />
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

export default Profil;
