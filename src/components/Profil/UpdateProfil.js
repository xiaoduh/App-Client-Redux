import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser, upperCase, isEmpty } from "../utils";
import ChartHeadcount from "./ChartHeadcount";
import ChartPayroll from "./ChartPayroll";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [candidaturePopup, setCandidaturePopup] = useState(false);
  // const [companyPopup, setCompanyPopup] = useState(false);
  const [jobLikedPopup, setJobLikedPopup] = useState(false);
  const [jobPublishedPopup, setJobPublishedPopup] = useState(false);
  const [myJobPopup, setMyJobPopup] = useState(false);
  const [toggleDaily, setToggleDaily] = useState(true);
  const [toggleYearly, setToggleYearly] = useState(false);

  const none = "Aucune";

  const userData = useSelector((state) => state.userReducer);
  const jobData = useSelector((state) => state.jobReducer);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    !isEmpty(userData) && setIsLoading(false);
  }, [userData]);

  const myCost = Math.floor((userData.salaire * 1.6) / 182);
  const myTjm = Math.floor((userData.salaire * 1.6) / 182) * 1.25;

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  const handleToggle = () => {
    setToggleDaily(!toggleDaily);
    setToggleYearly(!toggleYearly);
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <div className="profil-container">
          <LeftNav />
          <div className="header-profil-container">
            <h1> Mes informations 👨‍💻</h1>
          </div>
          <div className="update-container">
            <div className="left-part">
              <div className="toggle-container">
                <span
                  className={toggleDaily ? "toggle-active" : "toggle"}
                  onClick={handleToggle}
                >
                  Quotidien
                </span>
                <span
                  className={toggleYearly ? "toggle-active" : "toggle"}
                  onClick={handleToggle}
                >
                  Annuel
                </span>
              </div>
              <h3>Infos</h3>
              {/* <img src={userData.picture} alt="user-pic" /> */}
              {/* <UploadImg /> */}
              {/* <p>{error.maxSize}</p>
          <p>{error.format}</p> */}
              <h5>Ma fonction : {upperCase(userData.fonction)}</h5>
              <h5>
                Ma mission :{" "}
                {userData.missions > 0 ? upperCase(userData.missions) : ""}
              </h5>
              <h5>
                Mon salaire :{" "}
                <span style={{ color: "#f6bd60" }}>
                  {toggleYearly
                    ? userData.salaire
                    : Math.round(userData.salaire / 182)}
                </span>
                <span>{toggleYearly ? " € par an" : " € par jour"}</span>
              </h5>
              <h5>
                Mon coût :{" "}
                <span style={{ color: "#ff99c8" }}>
                  {toggleYearly ? Math.round(myCost * 182) : myCost}
                </span>
                <span>{toggleYearly ? " € par an" : " € par jour"}</span>
              </h5>
              <h5>
                Mon TJM :{" "}
                <span style={{ color: "#55B2FF" }}>
                  {toggleYearly ? myTjm * 182 : myTjm}
                </span>
                <span>{toggleYearly ? " € par an" : " € par jour"}</span>
              </h5>
              <h5>
                Marge générée :{" "}
                <span style={{ color: "#c7f9cc" }}>
                  {toggleYearly
                    ? Math.round((myTjm - myCost) * 182)
                    : myTjm - myCost}
                </span>
                <span>{toggleYearly ? " € par an" : " € par jour"}</span>
              </h5>
            </div>

            <div className="right-part">
              <div className="bio-update">
                <h3>Activités</h3>
                {updateForm === false && (
                  <>
                    <p onClick={() => setUpdateForm(!updateForm)}>
                      {userData.bio}
                    </p>
                    <button onClick={() => setUpdateForm(!updateForm)}>
                      Modifier ma bio
                    </button>
                  </>
                )}
                {updateForm && (
                  <>
                    <textarea
                      type="text"
                      defaultValue={userData.bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <button onClick={handleUpdate}>
                      Valider modifications
                    </button>
                  </>
                )}
              </div>
              <h4>Membre depuis {dateParser(userData.createdAt)}</h4>
              <h5 onClick={() => setCandidaturePopup(true)}>
                {userData.candidatures.length > 0
                  ? "Candidatures"
                  : "Candidature"}{" "}
                :{" "}
                {userData.candidatures.length > 0
                  ? userData.candidatures.length
                  : "aucune"}
              </h5>
              {/* <h5 onClick={() => setCompanyPopup(true)}>
            {userData.followingCompany.length > 0
              ? "Entreprises suivies"
              : "Entreprise suivie"}{" "}
            :{" "}
            {userData.followingCompany.length > 0
              ? userData.followingCompany.length
              : "aucune"}
          </h5> */}
              <h5 onClick={() => setJobLikedPopup(true)}>
                {userData.likesJob.length > 0
                  ? "Missions sauvergardées"
                  : "Mission sauvegardée"}{" "}
                : {""}
                {userData.likesJob.length > 0
                  ? userData.likesJob.length
                  : " aucune"}
              </h5>
              <h5 onClick={() => setJobPublishedPopup(true)}>
                {userData.jobPosted.length > 0
                  ? "Missions proposées"
                  : "Mission proposée"}{" "}
                :{" "}
                {userData.jobPosted.length > 0
                  ? userData.jobPosted.length
                  : " aucune"}
              </h5>
              <h5 onClick={() => setMyJobPopup(true)}>
                Mes missions :{"  "}
                {userData.missions.length > 0
                  ? userData.missions.length
                  : " aucune"}
              </h5>
            </div>
          </div>
          <div className="header-profil-container">
            <h1> Informations générales 📊</h1>
          </div>
          <div className="info-generale">
            <div className="chart-container">
              <h3>Masse salariale annuelle</h3>
              <ChartPayroll />
            </div>
          </div>
          <div className="info-generale">
            <div className="chart-container">
              <h3>Effectif</h3>
              <ChartHeadcount />
            </div>
          </div>
          {candidaturePopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Mes candidatures</h3>
                <span
                  className="cross"
                  onClick={() => setCandidaturePopup(false)}
                >
                  &#10005;
                </span>
                <ul>
                  {userData.candidatures.map((candidature) => {
                    if (userData.candidatures.length > 0) {
                      for (let i = 0; i < jobData.length; i++) {
                        if (candidature === jobData[i]._id) {
                          return <li>{upperCase(jobData[i].titre)}</li>;
                        } else return null;
                      }
                    } else return null;
                  })}
                </ul>
              </div>
            </div>
          )}
          {jobLikedPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Missions favorites</h3>
                <span className="cross" onClick={() => setJobLikedPopup(false)}>
                  &#10005;
                </span>
                <ul>
                  {userData.likesJob.map((likesJob) => {
                    if (userData.likesJob.length > 0) {
                      for (let i = 0; i < userData.likesJob.length; i++) {
                        if (likesJob === jobData[i]._id) {
                          return <li>{upperCase(jobData[i].titre)}</li>;
                        }
                        // console.log(likesJob);
                        // console.log(jobData[i]._id);
                      }
                    } else return <li>{none}</li>;
                  })}
                </ul>
              </div>
            </div>
          )}
          {jobPublishedPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Missions publiées</h3>
                <span
                  className="cross"
                  onClick={() => setJobPublishedPopup(false)}
                >
                  &#10005;
                </span>
                <ul>
                  {userData.jobPosted.map((jobPosted) => {
                    if (userData.jobPosted.length > 0) {
                      for (let i = 0; i < userData.jobPosted.length; i++) {
                        if (jobPosted === jobData[i]._id) {
                          return <li>{upperCase(jobData[i].titre)}</li>;
                        }
                      }
                    } else return <li>{none}</li>;
                  })}
                </ul>
              </div>
            </div>
          )}
          {myJobPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Missions</h3>
                <span className="cross" onClick={() => setMyJobPopup(false)}>
                  &#10005;
                </span>
                <ul>
                  {userData.missions.map((mission) => {
                    if (userData.missions.length > 0) {
                      for (let i = 0; i < userData.jobPosted.length; i++) {
                        if (mission === jobData[i]._id) {
                          return <li>{upperCase(jobData[i].titre)}</li>;
                        } else return null;
                      }
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateProfil;
