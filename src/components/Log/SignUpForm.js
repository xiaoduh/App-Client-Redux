import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [fonction, setFonction] = useState("");
  const [salary, setSalary] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const identifiantError = document.querySelector(".identifiant.error");
    const nomError = document.querySelector(".nom.error");
    const prenomError = document.querySelector(".prenom.error");
    const fonctionError = document.querySelector(".fonction.error");
    const salaryError = document.querySelector(".salary.error");
    const emailError = document.querySelector(".email.error");
    const telError = document.querySelector(".tel.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          identifiant,
          nom,
          prenom,
          email,
          tel,
          password,
          fonction,
          salary,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            identifiantError.innerHTML = res.data.errors.identifiant;
            nomError.innerHTML = res.data.errors.nom;
            prenomError.innerHTML = res.data.errors.prenom;
            emailError.innerHTML = res.data.errors.email;
            telError.innerHTML = res.data.errors.tel;
            passwordError.innerHTML = res.data.errors.password;
            fonctionError.innerHTML = res.data.errors.fonction;
            salaryError.innerHTML = res.data.errors.salary;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">Demande d'inscription validée</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="identifiant">Identifiant</label>
          <br />
          <input
            type="text"
            name="identifiant"
            id="identifiant"
            onChange={(e) => setIdentifiant(e.target.value)}
            value={identifiant}
          />
          <div className="identifiant error"></div>
          <br />
          <label htmlFor="nom">Nom</label>
          <br />
          <input
            type="text"
            name="nom"
            id="nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
          <div className="nom error"></div>
          <br />
          <label htmlFor="prenom">Prénom</label>
          <br />
          <input
            type="text"
            name="prenom"
            id="prenom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
          <div className="prenom error"></div>
          <br />
          <label htmlFor="tel">Téléphone</label>
          <br />
          <input
            type="text"
            name="tel"
            id="tel"
            onChange={(e) => setTel(e.target.value)}
            value={tel}
          />
          <div className="tel error"></div>
          <br />
          <label htmlFor="fonction">Fonction</label>
          <br />
          <input
            type="text"
            name="fonction"
            id="fonction"
            onChange={(e) => setFonction(e.target.value)}
            value={fonction}
          />
          <div className="fonction error"></div>
          <br />
          <label htmlFor="salary">Salaire</label>
          <br />
          <input
            type="text"
            name="salary"
            id="salary"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
          />
          <div className="salary error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />

          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUp;
