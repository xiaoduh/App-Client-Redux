import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Footer from "../components/Footer";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <>
      <div className="profil-page">
        {uid ? (
          <div className="home">
            <LeftNav />
            <div className="main">
              <Thread />
            </div>
          </div>
        ) : (
          <div className="log-container">
            <Log signin={false} signup={true} />
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

export default Home;
