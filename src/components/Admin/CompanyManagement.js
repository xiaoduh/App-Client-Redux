import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty, dateParser } from "../utils";

const CompanyManagement = () => {
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [jobIsLoading, setJobIsLoading] = useState(true);
  const [companyIsLoading, setCompanyIsLoading] = useState(true);
  const [editCompanyPopup, setEditCompanyPopup] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);
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
    !isEmpty(companies) && setCompanyIsLoading(false);
  }, [companies]);

  const handleEditCompany = (company) => {
    setCompanyToEdit(company);
    setEditCompanyPopup(true);
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
            <NavLink to="/add-company">
              <input type="button" value="Ajouter une entreprise" />
            </NavLink>
            <div className="chart-container">
              <h3>Tableaux des entreprises</h3>
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
                          <tr company={company} key={company._id}>
                            {" "}
                            <td>
                              {company._id.slice(
                                company._id.length - 4,
                                company._id.length
                              )}
                            </td>
                            <td>{company.nom}</td>
                            <td>{company.secteur}</td>
                            <td>{company.localisation}</td>
                            <td>{company.jobs.length}</td>
                            <td>{dateParser(company.createdAt)}</td>
                            <td
                              className="edit-tr"
                              onClick={() => handleEditCompany(company)}
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
      {editCompanyPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Modifier l'entreprise {companyToEdit.nom}</h3>
            <span className="cross" onClick={() => setEditCompanyPopup(false)}>
              &#10005;
            </span>
            <ul></ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyManagement;
