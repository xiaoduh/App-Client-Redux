import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCompany,
  deleteCompany,
  getCompany,
  updateCompany,
} from "../../actions/company.actions";
import { isEmpty, dateParser } from "../utils";

const CompanyManagement = () => {
  const [loadCompany, setLoadCompany] = useState(true);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [jobIsLoading, setJobIsLoading] = useState(true);
  const [companyIsLoading, setCompanyIsLoading] = useState(true);

  const [editCompanyPopup, setEditCompanyPopup] = useState(false);
  const [addCompanyPopup, setAddCompanyPopup] = useState(false);

  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [nomUpdate, setNomUpdate] = useState(null);
  const [secteurUpdate, setSecteurUpdate] = useState(null);
  const [localisationUpdate, setLocalisationUpdate] = useState(null);
  const [descriptionUpdate, setDescriptionUpdate] = useState(null);
  const [videoUpdate, setVideoUpdate] = useState(null);

  const [nomNewCompany, setNomNewCompany] = useState("");
  const [secteurNewCompany, setSecteurNewCompany] = useState("");
  const [localisationNewCompany, setLocalisationNewCompany] = useState("");
  const [descriptionNewCompany, setDescriptionNewCompany] = useState("");
  const [videoNewCompany, setVideoNewCompany] = useState("");

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
    !isEmpty(companies) && setCompanyIsLoading(false);
  }, [companies]);

  useEffect(() => {
    if (loadCompany) {
      dispatch(getCompany());
      setLoadCompany(false);
    }
  }, [loadCompany]);

  const handleEditCompany = (company) => {
    setCompanyToEdit(company);
    setNomUpdate(company.nom);
    setSecteurUpdate(company.secteur);
    setLocalisationUpdate(company.localisation);
    setDescriptionUpdate(company.description);
    setVideoUpdate(company.video);
    setEditCompanyPopup(true);
  };

  const handleModificationForm = () => {
    if (
      nomUpdate ||
      secteurUpdate ||
      localisationUpdate ||
      descriptionUpdate ||
      videoUpdate
    ) {
      dispatch(
        updateCompany(
          companyToEdit._id,
          nomUpdate,
          secteurUpdate,
          localisationUpdate,
          descriptionUpdate,
          videoUpdate
        )
      );
    }
    setEditCompanyPopup(false);
  };

  const handleAddNewCompanyForm = () => {
    if (
      nomNewCompany &&
      secteurNewCompany &&
      localisationNewCompany &&
      descriptionNewCompany &&
      videoNewCompany !== null
    ) {
      dispatch(
        addNewCompany(
          nomNewCompany,
          secteurNewCompany,
          localisationNewCompany,
          descriptionNewCompany,
          videoNewCompany
        )
      );
      setAddCompanyPopup(false);
      setLoadCompany(true);
    }
  };

  const handleDeleteCompany = (companyId) => {
    dispatch(deleteCompany(companyId));
  };
  return (
    <>
      {userIsLoading && jobIsLoading && companyIsLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <div className="profil-container">
          <div className="header-profil-container">
            <h1> Gestion des entreprises 🏭</h1>
          </div>
          <div className="info-generale">
            <input
              type="button"
              value="Ajouter une entreprise"
              onClick={() => setAddCompanyPopup(true)}
            />
            <div className="chart-container">
              <h3>Tableaux des entreprises ({companies.length})</h3>
              <table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Nom</th>
                    <th>Secteur</th>
                    <th>Localisation</th>
                    <th>Nb Missions</th>
                    <th>Date de création</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(companies[0]) &&
                    companies.map((company) => {
                      return (
                        <>
                          <tr key={company._id}>
                            {" "}
                            <td key={Math.random()}>
                              {company._id.slice(
                                company._id.length - 4,
                                company._id.length
                              )}
                            </td>
                            <td key={Math.random()}>{company.nom}</td>
                            <td key={Math.random()}>{company.secteur}</td>
                            <td key={Math.random()}>{company.localisation}</td>
                            <td key={Math.random()}>{company.jobs.length}</td>
                            <td key={Math.random()}>
                              {dateParser(company.createdAt)}
                            </td>
                            <td
                              className="edit-tr"
                              onClick={() => handleEditCompany(company)}
                            >
                              <img src="./img/icons/edit.svg" alt="" />
                            </td>
                            <td
                              className="edit-tr"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Voulez-vous supprimer cette entreprise ?"
                                  )
                                ) {
                                  handleDeleteCompany(company._id);
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
      {editCompanyPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Modifier l'entreprise {companyToEdit.nom}</h3>
            <span className="cross" onClick={() => setEditCompanyPopup(false)}>
              &#10005;
            </span>
            <form
              action=""
              id="edit-form"
              onSubmit={() =>
                handleModificationForm(
                  companyToEdit._id,
                  nomUpdate,
                  secteurUpdate,
                  localisationUpdate,
                  descriptionUpdate,
                  videoUpdate
                )
              }
            >
              <label htmlFor="nom">Nom</label>
              <br />
              <input
                type="text"
                name="nom"
                id="nom"
                defaultValue={companyToEdit.nom}
                onChange={(e) => setNomUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="secteur">Secteur</label>
              <br />
              <input
                type="text"
                name="secteur"
                id="secteur"
                defaultValue={companyToEdit.secteur}
                onChange={(e) => setSecteurUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="localisation">Localisation</label>
              <br />
              <input
                type="text"
                name="localisation"
                id="localisation"
                defaultValue={companyToEdit.localisation}
                onChange={(e) => setLocalisationUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                type="text"
                name="description"
                id="description"
                defaultValue={companyToEdit.description}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="video">Vidéo</label>
              <br />
              <input
                type="text"
                name="video"
                id="video"
                defaultValue={companyToEdit.video}
                onChange={(e) => setVideoUpdate(e.target.value)}
              />
              <br />
              <button type="submit">Valider mes modification</button>
            </form>
          </div>
        </div>
      )}
      {addCompanyPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Ajouter une entreprise</h3>
            <span className="cross" onClick={() => setAddCompanyPopup(false)}>
              &#10005;
            </span>
            <form
              action=""
              id="edit-form"
              onSubmit={() =>
                handleAddNewCompanyForm(
                  nomNewCompany,
                  secteurNewCompany,
                  localisationNewCompany,
                  descriptionNewCompany,
                  videoNewCompany
                )
              }
            >
              <label htmlFor="nom">Nom</label>
              <br />
              <input
                type="text"
                name="nom"
                id="nom"
                placeholder="Nom de l'entreprise"
                onChange={(e) => setNomNewCompany(e.target.value)}
              />
              <br />
              <label htmlFor="secteur">Secteur</label>
              <br />
              <input
                type="text"
                name="secteur"
                id="secteur"
                placeholder="Secteur de l'entreprise"
                onChange={(e) => setSecteurNewCompany(e.target.value)}
              />
              <br />
              <label htmlFor="localisation">Localisation</label>
              <br />
              <input
                type="text"
                name="localisation"
                id="localisation"
                placeholder="Localisation de l'entreprise"
                onChange={(e) => setLocalisationNewCompany(e.target.value)}
              />
              <br />
              <label htmlFor="description">Description</label>
              <br />
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Description de l'entreprise"
                onChange={(e) => setDescriptionNewCompany(e.target.value)}
              />
              <br />
              <label htmlFor="video">Vidéo</label>
              <br />
              <input
                type="text"
                name="video"
                id="video"
                placeholder="Vidéo de présentation de l'entreprise"
                onChange={(e) => setVideoNewCompany(e.target.value)}
              />
              <br />
              {nomNewCompany &&
              secteurNewCompany &&
              localisationNewCompany &&
              descriptionNewCompany &&
              videoNewCompany ? (
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

export default CompanyManagement;
