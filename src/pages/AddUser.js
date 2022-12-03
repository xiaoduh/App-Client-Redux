import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Footer from "../components/Footer";
import Log from "../components/Log";
import { useSelector } from "react-redux";
import SignUpForm from "../components/Log/SignUpForm";

const AddUser = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  console.log(userData.superAdmin);
  return (
    <>
      <div className="profil-page">
        {uid && userData.superAdmin ? (
          <>
            <SignUpForm />
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

export default AddUser;
