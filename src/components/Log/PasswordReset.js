import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("nouveauPW");
  const [newPasswordConfirm, setNewPasswordConfirm] =
    useState("confirmerNouveauPW");

  const [passwordValid, setPasswordValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}api/user/reset-password/${id}/${token}`,
      newPassword
    );
    if (res.status === 200) {
      alert("password changed Successfully");
      navigate("/");
    }
  };

  useEffect(() => {
    newPassword === newPasswordConfirm
      ? setPasswordValid(true)
      : setPasswordValid(false);
  }, [newPassword, newPasswordConfirm]);
  return (
    <>
      {" "}
      <div className="connection-form">
        <div className="form-container">
          <form id="reset-password-form" onSubmit={handleSubmit}>
            <label htmlFor="password" id="password">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor="confirmerPassword" id="confirmerPassword">
              Confirmer nouveau mot de passe
            </label>
            <input
              type="password"
              name="confirmerPassword"
              id="confirmerPassword"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
            <div className="email error"></div>
            <div className="email success"></div>
            <br />
            {passwordValid ? (
              <input type="submit" value="Valider mon mot de passe" />
            ) : (
              ""
            )}
          </form>
          <div className="reset-password">
            <p>Accueil</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
