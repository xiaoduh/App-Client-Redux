import React, { useState, useEffect } from "react";
import {
  addJob,
  deleteJob,
  getJobs,
  updateJob,
} from "../../actions/job.actions";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import { isEmpty, dateParser } from "../utils";

const JobManagement = () => {
  const [loadJob, setLoadJob] = useState(true);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [jobIsLoading, setJobIsLoading] = useState(true);
  const [companyIsLoading, setCompanyIsLoading] = useState(true);

  const [editJobPopup, setEditJobPopup] = useState(false);
  const [addNewJobPopup, setAddNewJobPopup] = useState(false);

  const [jobToEdit, setJobToEdit] = useState(null);
  const [titreUpdate, setTitreUpdate] = useState(null);
  const [entrepriseUpdate, setEntrepriseUpdate] = useState(null);
  const [serviceUpdate, setServiceUpdate] = useState(null);
  const [projetUpdate, setProjetUpdate] = useState(null);
  const [descriptionUpdate, setDescriptionUpdate] = useState(null);
  const [profilUpdate, setProfilUpdate] = useState(null);
  const [tjmUpdate, setTjmUpdate] = useState(null);

  const [titreNewJob, setTitreNewJob] = useState(null);
  const [entrepriseNewJob, setEntrepriseNewJob] = useState(null);
  const [serviceNewJob, setServiceNewJob] = useState(null);
  const [projetNewJob, setProjetNewJob] = useState(null);
  const [descriptionNewJob, setDescriptionNewJob] = useState(null);
  const [skillNewJob, setSkillNewJob] = useState(null);
  const [profilNewJob, setProfilNewJob] = useState(null);
  const [tjmNewJob, setTjmNewJob] = useState(null);

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
    setServiceUpdate(job.service);
    setProjetUpdate(job.projet);
    setDescriptionUpdate(job.description);
    setProfilUpdate(job.profil);
    setTjmUpdate(job.tjm);
    companies.map((company) => {
      if (company._id === jobToEdit.companyId) {
        setEntrepriseUpdate(company.nom);
      }
    });
    setEditJobPopup(true);
  };

  const handleNewJob = async (
    titre,
    companyId,
    service,
    projet,
    description,
    competence,
    profil,
    tjm
  ) => {
    if (
      titre &&
      companyId &&
      service &&
      projet &&
      description &&
      competence &&
      profil &&
      tjm
    ) {
      await dispatch(
        addJob(
          titre,
          companyId,
          service,
          projet,
          description,
          competence,
          profil,
          tjm
        )
      );
      dispatch(getJobs());
    }
    setAddNewJobPopup(true);
  };

  const handleModificationForm = (
    jobToEdit,
    titre,
    service,
    projet,
    description,
    profil,
    tjm
  ) => {
    if (
      jobToEdit &&
      titre &&
      service &&
      projet &&
      description &&
      profil &&
      tjm
    ) {
      dispatch(
        updateJob(jobToEdit, titre, service, projet, description, profil, tjm)
      );
    }
    setEditJobPopup(false);
  };

  const cancelAddNewJob = () => {
    setTitreNewJob(null);
    setEntrepriseNewJob(null);
    setServiceNewJob(null);
    setProjetNewJob(null);
    setDescriptionNewJob(null);
    setSkillNewJob(null);
    setProfilNewJob(null);
    setTjmNewJob(null);
    setAddNewJobPopup(false);
  };

  const handleDeleteJob = (jobId) => {
    dispatch(deleteJob(jobId));
  };

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
            <input
              type="button"
              value="Ajouter une mission"
              onClick={() => setAddNewJobPopup(true)}
            />
            <div className="chart-container">
              <h3>Tableaux des offres actives ({jobs.length})</h3>
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
                            {companies.map((company) => {
                              if (company._id === job.companyId) {
                                return <td>{company.nom}</td>;
                              }
                            })}
                            <td>{job.service}</td>
                            <td>{job.projet}</td>
                            <td>{job.tjm}</td>
                            <td>{dateParser(job.createdAt)}</td>
                            <td>{job.candidat.length}</td>
                            <td
                              className="edit-tr"
                              onClick={() => handleEditJob(job)}
                            >
                              <img src="./img/icons/edit.svg" alt="" />
                            </td>
                            <td
                              className="edit-tr"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Voulez-vous supprimer cette mission ?"
                                  )
                                ) {
                                  handleDeleteJob(job._id);
                                }
                              }}
                            >
                              <img src="./img/icons/trash.svg" alt="" />
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
              {/* <label htmlFor="entreprise">Entreprise</label>
              <br />
              <input
                type="text"
                name="entreprise"
                id="entreprise"
                defaultValue={entrepriseUpdate}
                readonly="readonly"
              />
              <br /> */}
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
      {addNewJobPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Ajouter une mission</h3>
            <span className="cross" onClick={() => cancelAddNewJob()}>
              &#10005;
            </span>
            <form
              action=""
              id="edit-form"
              onSubmit={() =>
                handleNewJob(
                  titreNewJob,
                  entrepriseNewJob,
                  serviceNewJob,
                  projetNewJob,
                  descriptionNewJob,
                  skillNewJob,
                  profilNewJob,
                  tjmNewJob
                )
              }
            >
              <label htmlFor="name">Titre</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Titre de l'annonce"
                required
                onChange={(e) => setTitreNewJob(e.target.value)}
              />
              <br />
              <label htmlFor="entreprise">Entreprise</label>
              <br />
              <select
                onChange={(e) => setEntrepriseNewJob(e.target.value)}
                required
              >
                <option value={null}>Selectionner une entreprise</option>
                {companies &&
                  companies.map((company) => {
                    return <option value={company._id}>{company.nom}</option>;
                  })}
              </select>
              <br />
              <label htmlFor="service">Service</label>
              <br />
              <input
                type="text"
                name="service"
                id="service"
                placeholder="Description du service"
                required
                onChange={(e) => setServiceNewJob(e.target.value)}
              />
              <br />
              <label htmlFor="projet">Projet</label>
              <br />
              <input
                type="text"
                name="projet"
                id="projet"
                placeholder="Description du projet"
                required
                onChange={(e) => setProjetNewJob(e.target.value)}
              />
              <br />
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Description de la mission"
                required
                onChange={(e) => setDescriptionNewJob(e.target.value)}
              />
              <br />
              <label htmlFor="skill">Compétences clées</label>
              <br />
              <input
                type="text"
                name="skill"
                id="skill"
                placeholder="Compétences recherchées"
                required
                onChange={(e) => setSkillNewJob(e.target.value)}
              />
              <br />
              <label htmlFor="profil">Profil recherché</label>
              <br />
              <input
                type="text"
                name="profil"
                id="profil"
                placeholder="Profil recherché"
                required
                onChange={(e) => setProfilNewJob(e.target.value)}
              />
              <br />
              <label htmlFor="tjm">TJM</label>
              <br />
              <input
                type="text"
                name="tjm"
                id="tjm"
                placeholder="TJM ciblé"
                required
                onChange={(e) => setTjmNewJob(e.target.value)}
              />
              <br />
              {(titreNewJob !== null || "") &&
              (entrepriseNewJob !== null || "") &&
              (serviceNewJob !== null || "") &&
              (projetNewJob !== null || "") &&
              (descriptionNewJob !== null || "") &&
              (skillNewJob !== null || "") &&
              (profilNewJob !== null || "") &&
              (tjmNewJob !== null || "") ? (
                <button type="submit">Ajouter</button>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JobManagement;
