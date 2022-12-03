import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { upperCase } from "../utils";
import emailjs from "@emailjs/browser";

const ApplyJobForm = ({ job }) => {
  const form = useRef();

  const sendEmail = (e, job) => {
    e.preventDefault();
    const formMess = document.querySelector(".form-message");

    emailjs
      .sendForm(
        "service_olo8f1l",
        "template_nhcm8tu",
        form.current,
        process.env.REACT_APP_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          formMess.innerHTML =
            "<p class='success'>merci, ta candidature est bien prise en compte !</p>";

          setTimeout(() => {
            formMess.innerHTML = "";
          }, 2500);
        },
        (error) => {
          console.log(error.text);
          formMess.innerHTML =
            "<p class='error'>oups, ne erreur s'est produite ! Merci de réessayer.</p>";

          setTimeout(() => {
            formMess.innerHTML = "";
          }, 2500);
        }
      );
  };
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
        <div className="content-job-desc">
          <div className="header-desc-job">
            <h2>
              <span>{upperCase(job.titre)}</span>
            </h2>
            <div className="info-header-job">
              <p>
                pour <span>{upperCase(job.entreprise)}</span>
              </p>
              <p>
                profil recherché : <span>{upperCase(job.profil)}</span>
              </p>
              <p>
                Budget : <span>{upperCase(job.tjm)}</span> € jour
              </p>
            </div>
          </div>
          <div className="content-body-job">
            <h3>
              <span>
                pour le compte de {upperCase(job.entreprise)} et au sein du
                service {upperCase(job.service)}
              </span>
            </h3>
            <p>
              <span>
                Tu interviendra sur le projet {upperCase(job.projet)} qui a pour
                objectif de {upperCase(job.projet)}
              </span>
            </p>
            <p>
              <span>{upperCase(job.description)}</span>
            </p>
            <h3>
              <span>{upperCase(job.competence)}</span>
            </h3>
          </div>
        </div>
        <div className="form-container">
          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="job"
              id=""
              value={job.titre}
              style={{ display: "none" }}
            />
            <input
              type="text"
              name="company"
              id=""
              value={job.entreprise}
              style={{ display: "none" }}
            />
            <label htmlFor="email">Adresse email</label>
            <br />
            <input type="text" name="email" id="email" required />
            <br />
            <label htmlFor="nom">Nom</label>
            <br />
            <input type="text" name="nom" id="nom" required />
            <div className="nom error"></div>
            <br />
            <label htmlFor="prenom">Prénom</label>
            <br />
            <input type="text" name="prenom" id="prenom" required />
            <div className="prenom error"></div>
            <br />
            <label htmlFor="tel">Téléphone</label>
            <br />
            <input type="text" name="phone" id="tel" required />
            <div className="tel error"></div>
            <br />
            <label htmlFor="motivation">Pourquoi le poste t'intéresse ?</label>
            <textarea
              name="motivation"
              id="motivation"
              cols="30"
              rows="10"
              placeholder="En quoi le poste présente un intérêt pour toi et ta carrière..."
              required
            ></textarea>
            <br />
            <br />
            <label htmlFor="skill">
              Quelles compétences souhaites-tu mettre en avant ?
            </label>
            <textarea
              name="skill"
              id="skill"
              cols="30"
              rows="10"
              placeholder="Par rapport aux compétences recherchées, comment peux-tu apporter ton aide... ?"
              required
            ></textarea>
            <br />
            <br />
            <label htmlFor="why">Pourquoi toi et pas un autre ?</label>
            <textarea
              name="why"
              id="why"
              cols="30"
              rows="10"
              placeholder="Il s'agit de mettre en avant tes traits de caractère par rapport au profil recherché..."
              required
            ></textarea>
            <br />
            <br />
            <input type="submit" value="Valider ma candidature" />
            <div className="form-message"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobForm;
