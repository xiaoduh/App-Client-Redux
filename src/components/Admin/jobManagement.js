import React, { useState, useEffect } from "react";
import { getJobs, updateJob } from "../../actions/job.actions";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import { NavLink } from "react-router-dom";
import { isEmpty, dateParser } from "../utils";

const JobManagement = () => {
  const [loadJob, setLoadJob] = useState(true);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [jobIsLoading, setJobIsLoading] = useState(true);
  const [companyIsLoading, setCompanyIsLoading] = useState(true);
  const [editJobPopup, setEditJobPopup] = useState(false);
  const [jobToEdit, setJobToEdit] = useState("");
  const [titreUpdate, setTitreUpdate] = useState(null);
  const [entrepriseUpdate, setEntrepriseUpdate] = useState(null);
  const [serviceUpdate, setServiceUpdate] = useState(null);
  const [projetUpdate, setProjetUpdate] = useState(null);
  const [descriptionUpdate, setDescriptionUpdate] = useState(null);
  const [profilUpdate, setProfilUpdate] = useState(null);
  const [tjmUpdate, setTjmUpdate] = useState(null);
  const userData = useSelector((state) => state.userReducer);
  const jobs = useSelector((state) => state.jobReducer);
  const companies = useSelector((state) => state.companyReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    !isEmpty(userData) && setUserIsLoading(false);
  }, [userData]);

  useEffect(() => {
    !isEmpty(jobs) && setJobIsLoading(false);
  }, [jobs]);

  useEffect(() => {
    if (loadJob) {
      dispatch(getJobs());
      setLoadJob(false);
    }
  }, []);

  useEffect(() => {
    !isEmpty(companies) && setCompanyIsLoading(false);
  }, [companies]);

  const handleEditJob = (job) => {
    setJobToEdit(job);
    setTitreUpdate(job.titre);
    setEntrepriseUpdate(job.entreprise);
    setServiceUpdate(job.service);
    setProjetUpdate(job.projet);
    setDescriptionUpdate(job.description);
    setProfilUpdate(job.profil);
    setTjmUpdate(job.tjm);
    setEditJobPopup(true);
  };

  const handleModificationForm = () => {
    if (
      titreUpdate ||
      entrepriseUpdate ||
      serviceUpdate ||
      projetUpdate ||
      descriptionUpdate ||
      tjmUpdate ||
      profilUpdate
    ) {
      dispatch(
        updateJob(
          jobToEdit._id,
          titreUpdate,
          entrepriseUpdate,
          serviceUpdate,
          projetUpdate,
          descriptionUpdate,
          profilUpdate,
          tjmUpdate
        )
      );
    }
    setEditJobPopup(false);
  };

  // console.log(
  //   titreUpdate,
  //   entrepriseUpdate,
  //   serviceUpdate,
  //   projetUpdate,
  //   descriptionUpdate,
  //   tjmUpdate,
  //   profilUpdate
  // );

  return (
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
            <NavLink to="/add-job">
              <input type="button" value="Ajouter une mission" />
            </NavLink>
            <div className="chart-container">
              <h3>Tableaux des offres actives</h3>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Titre</th>
                    <th>Entreprise</th>
                    <th>Service</th>
                    <th>Projet</th>
                    <th>TJM</th>
                    <th>Date création</th>
                    <th>Nb candidat</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(jobs[0]) &&
                    jobs.map((job) => {
                      return (
                        <>
                          <tr job={job} key={job._id} companiesData={companies}>
                            {" "}
                            <td>
                              {job._id.slice(
                                job._id.length - 4,
                                job._id.length
                              )}
                            </td>
                            <td>{job.titre}</td>
                            <td>{job.entreprise}</td>
                            <td>{job.service}</td>
                            <td>{job.projet}</td>
                            <td>{job.tjm}</td>
                            <td>{dateParser(job.createdAt)}</td>
                            <td>{job.candidat.length}</td>
                            <td
                              className="edit-tr"
                              onClick={() => handleEditJob(job)}
                            >
                              ✏️
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {editJobPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>
              Modifier la mission{" "}
              {jobToEdit._id.slice(
                jobToEdit._id.length - 4,
                jobToEdit._id.length
              )}
            </h3>
            <span className="cross" onClick={() => setEditJobPopup(false)}>
              &#10005;
            </span>
            <form
              action=""
              id="edit-form"
              onSubmit={() =>
                handleModificationForm(
                  jobToEdit._id,
                  titreUpdate,
                  entrepriseUpdate,
                  serviceUpdate,
                  projetUpdate,
                  descriptionUpdate,
                  profilUpdate,
                  tjmUpdate
                )
              }
            >
              <label htmlFor="name">Titre</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={jobToEdit.titre}
                onChange={(e) => setTitreUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="entreprise">Entreprise</label>
              <br />
              <input
                type="text"
                name="entreprise"
                id="entreprise"
                defaultValue={jobToEdit.entreprise}
                onChange={(e) => setEntrepriseUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="service">Service</label>
              <br />
              <input
                type="text"
                name="service"
                id="service"
                defaultValue={jobToEdit.service}
                onChange={(e) => setServiceUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="projet">Projet</label>
              <br />
              <input
                type="text"
                name="projet"
                id="projet"
                defaultValue={jobToEdit.projet}
                onChange={(e) => setProjetUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                type="text"
                name="description"
                id="description"
                defaultValue={jobToEdit.description}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="profil">Profil recherché</label>
              <br />
              <input
                type="text"
                name="profil"
                id="profil"
                defaultValue={jobToEdit.profil}
                onChange={(e) => setProfilUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="tjm">TJM</label>
              <br />
              <input
                type="text"
                name="tjm"
                id="tjm"
                defaultValue={jobToEdit.tjm}
                onChange={(e) => setTjmUpdate(e.target.value)}
              />
              <br />
              <button type="submit">Valider mes modification</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JobManagement;
