import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import Footer from "../components/Footer";
import Log from "../components/Log";

const AddJob = () => {
  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);

  return (
    <>
      <div className="profil-page">
        {uid && userData.superAdmin ? (
          <>form add company</>
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

export default AddJob;
