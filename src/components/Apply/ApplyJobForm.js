import React from "react";
import { NavLink } from "react-router-dom";
import { upperCase } from "../utils";

const ApplyJobForm = ({ job }) => {
  return (
    <div className="apply-container">
      <div className="header-profil-container">
        <NavLink to="/home">
          <input type="button" value="Retour aux offres" />
        </NavLink>
        <h1>Formulaire de candidature 📧</h1>
        <h3>
          pour le poste{" "}
          <span style={{ color: "#55B2FF" }}>{upperCase(job.titre)}</span> chez{" "}
          <span style={{ color: "#55B2FF" }}>{upperCase(job.entreprise)}</span>
        </h3>
      </div>
      <div className="apply-form">
        <div className="content-job-desc"></div>
        <div className="form-container">
          <h3>Dernière étape </h3>
          <form action="">
            <label htmlFor="identifiant">Identifiant</label>
            <br />
            <input type="text" name="identifiant" id="identifiant" />
            <div className="identifiant error"></div>
            <br />
            <label htmlFor="nom">Nom</label>
            <br />/
            <input type="text" name="nom" id="nom" />
            <div className="nom error"></div>
            <br />
            <label htmlFor="prenom">Prénom</label>
            <br />
            <input type="text" name="prenom" id="prenom" />
            <div className="prenom error"></div>
            <br />
            <label htmlFor="tel">Téléphone</label>
            <br />
            <input type="text" name="tel" id="tel" />
            <div className="tel error"></div>
            <br />
            <label htmlFor="fonction">Fonction</label>
            <br />
            <input type="text" name="fonction" id="fonction" />
            <div className="fonction error"></div>
            <br />
            <label htmlFor="salary">Salaire</label>
            <br />
            <input type="text" name="salary" id="salary" />
            <div className="salary error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id="email" />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name="password" id="password" />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf">Confirmer mot de passe</label>
            <br />
            <input type="password" name="password" id="password-conf" />
            <div className="password-confirm error"></div>
            <br />
            <input type="submit" value="Valider inscription" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobForm;
