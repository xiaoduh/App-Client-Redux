import React, { useContext, useState, useEffect } from "react";
import { UidContext } from "../components/AppContext";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";
import { isEmpty } from "../components/utils";

const Data = () => {
  const uid = useContext(UidContext);
  const [loadJob, setLoadJob] = useState(true);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [jobIsLoading, setJobIsLoading] = useState(true);
  const [companyIsLoading, setCompanyIsLoading] = useState(true);

  const userData = useSelector((state) => state.userReducer);
  const jobs = useSelector((state) => state.jobReducer);
  const companies = useSelector((state) => state.companyReducer);

  useEffect(() => {
    !isEmpty(userData) && setUserIsLoading(false);
  }, [userData]);

  useEffect(() => {
    !isEmpty(jobs) && setJobIsLoading(false);
  }, [jobs]);

  useEffect(() => {
    if (loadJob) {
      setLoadJob(false);
    }
  }, []);

  useEffect(() => {
    !isEmpty(companies) && setCompanyIsLoading(false);
  }, [companies]);
  return (
    <>
      <div className="profil-page">
        {uid ? (
          <>
            {userIsLoading && jobIsLoading && companyIsLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <div className="profil-container">
                <LeftNav />
                <div className="header-profil-container">
                  <h1> Gestion des offres 📁 </h1>
                </div>
                <div className="info-generale">
                  <input type="button" value="Ajouter une mission" />
                  <div className="chart-container">
                    <h3>Tableaux des offres actives </h3>
                  </div>
                </div>
              </div>
            )}
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

export default Data;
