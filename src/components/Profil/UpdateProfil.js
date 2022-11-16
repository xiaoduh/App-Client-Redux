import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import LeftNav from "../LeftNav";
import { dateParser } from "../utils";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [candidaturePopup, setCandidaturePopup] = useState(false);
  const [companyPopup, setCompanyPopup] = useState(false);
  const [jobLikedPopup, setJobLikedPopup] = useState(false);
  const [jobPublishedPopup, setJobPublishedPopup] = useState(false);
  const [myJobPopup, setMyJobPopup] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };
  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.prenom}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Infos</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          {/* <p>{error.maxSize}</p>
          <p>{error.format}</p> */}
          <h5>Ma fonction : {userData.fonction}</h5>
          <h5>Ma mission : {userData.missions}</h5>
          <h5>
            Mon salaire : {userData.salary} {"€"}
          </h5>
        </div>

        <div className="right-part">
          <div className="bio-update">
            <h3>Activités</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
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
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis {dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setCandidaturePopup(true)}>
            {userData.candidatures.length > 0 ? "Candidatures" : "Candidature"}{" "}
            :{" "}
            {userData.candidatures.length > 0
              ? userData.candidatures.length
              : "aucune"}
          </h5>
          <h5 onClick={() => setCompanyPopup(true)}>
            {userData.followingCompany.length > 0
              ? "Entreprises suivies"
              : "Entreprise suivie"}{" "}
            :{" "}
            {userData.followingCompany.length > 0
              ? userData.followingCompany.length
              : "aucune"}
          </h5>
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
      {candidaturePopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Mes candidatures</h3>
            <span className="cross" onClick={() => setCandidaturePopup(false)}>
              &#10005;
            </span>
            <ul>
              {userData.candidatures.map((candidature) => {
                if (userData.candidatures.length > 0) {
                  for (let i = 0; i < userData.candidatures.length; i++) {
                    return <li key={candidature.pin}>{candidature}</li>;
                  }
                } else return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {companyPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Entreprises favorites</h3>
            <span className="cross" onClick={() => setCompanyPopup(false)}>
              &#10005;
            </span>
            //tutoriel 4:00:00
            <ul>
              {userData.followingCompany.map((followingCompany) => {
                if (userData.followingCompany.length > 0) {
                  for (let i = 0; i < userData.followingCompany.length; i++) {
                    return (
                      <li key={followingCompany.pin}>{followingCompany}</li>
                    );
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
                    return <li key={likesJob.pin}>{likesJob}</li>;
                  }
                } else return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {jobPublishedPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Missions publiées</h3>
            <span className="cross" onClick={() => setJobPublishedPopup(false)}>
              &#10005;
            </span>
            <ul>
              {userData.jobPosted.map((jobPosted) => {
                if (userData.jobPosted.length > 0) {
                  for (let i = 0; i < userData.jobPosted.length; i++) {
                    return <li key={jobPosted.pin}>{jobPosted}</li>;
                  }
                } else return null;
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
                  for (let i = 0; i < userData.missions.length; i++) {
                    return <li key={mission.pin}>{mission}</li>;
                  }
                } else return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfil;
