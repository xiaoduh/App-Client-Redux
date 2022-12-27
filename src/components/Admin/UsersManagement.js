import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import { isEmpty } from "../utils";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../actions/users.actions";

const UsersManagement = () => {
  const [loadUsers, setLoadUsers] = useState(true);
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [usersIsLoading, setUsersIsLoading] = useState(true);

  const [editUserPopup, setEditUserPopup] = useState(false);
  const [addUserPopup, setAddUserPopup] = useState(false);

  const [userToEdit, setUserToEdit] = useState(null);
  const [identifiantUpdate, setIdentifiantUpdate] = useState(null);
  const [nomUpdate, setNomUpdate] = useState(null);
  const [prenomUpdate, setPrenomUpdate] = useState(null);
  const [emailUpdate, setEmailUpdate] = useState(null);
  const [fonctionUpdate, setFonctionUpdate] = useState(null);
  const [salaireUpdate, setSalaireUpdate] = useState(null);

  const [identifiantNewUser, setIdentifiantNewUser] = useState(null);
  const [nomNewUser, setNomNewUser] = useState(null);
  const [prenomNewUser, setPrenomNewUser] = useState(null);
  const [telNewUser, setTelNewUser] = useState(null);
  const [fonctionNewUser, setFonctionNewUser] = useState(null);
  const [salaireNewUser, setSalaireNewUser] = useState(null);
  const [emailNewUser, setEmailNewUser] = useState(null);
  const [passwordNewUser, setPasswordNewUser] = useState(null);

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    !isEmpty(userData) && setUserIsLoading(false);
  }, [userData]);

  useEffect(() => {
    if (loadUsers) {
      dispatch(getUsers());
      setLoadUsers(false);
    }
  }, []);

  useEffect(() => {
    !isEmpty(usersData) && setUsersIsLoading(false);
  }, [usersData]);

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIdentifiantUpdate(user.identifiant);
    setNomUpdate(user.nom);
    setPrenomUpdate(user.prenom);
    setEmailUpdate(user.email);
    setFonctionUpdate(user.fonction);
    setSalaireUpdate(user.salaire);
    setEditUserPopup(true);
  };

  const handleModificationForm = () => {
    if (
      identifiantUpdate ||
      nomUpdate ||
      prenomUpdate ||
      emailUpdate ||
      fonctionUpdate ||
      salaireUpdate
    ) {
      dispatch(
        updateUser(
          userToEdit._id,
          identifiantUpdate,
          nomUpdate,
          prenomUpdate,
          emailUpdate,
          fonctionUpdate,
          salaireUpdate
        )
      );
    }
    setEditUserPopup(false);
  };

  const handleNewUser = async (
    e,
    identifiant,
    nom,
    prenom,
    tel,
    fonction,
    salaire,
    email,
    password
  ) => {
    if (
      identifiant &&
      nom &&
      prenom &&
      tel &&
      fonction &&
      salaire &&
      email &&
      password
    ) {
      await dispatch(
        addUser(
          identifiant,
          nom,
          prenom,
          tel,
          fonction,
          salaire,
          email,
          password
        )
      );
      dispatch(getUsers());
    }
    setAddUserPopup(false);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <>
      {userIsLoading && usersIsLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <div className="profil-container">
          <LeftNav />
          <div className="header-profil-container">
            <h1> Gestion des membres 👨‍🔧</h1>
          </div>
          <div className="info-generale">
            <input
              type="button"
              value="Ajouter un membre"
              onClick={() => setAddUserPopup(true)}
            />
            <div className="chart-container">
              <h3>Tableaux des membres actifs ({usersData.length})</h3>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Identifiant</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Fonction</th>
                    <th>Salaire</th>
                    {/* <th>Date de création</th> */}
                    <th>Nb mission proposée</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      return (
                        <>
                          <tr user={user} key={user._id}>
                            {" "}
                            <td>
                              {user._id.slice(
                                user._id.length - 4,
                                user._id.length
                              )}
                            </td>
                            <td>{user.identifiant}</td>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                            <td>{user.fonction}</td>
                            <td>{user.salaire}</td>
                            {/* <td>{user.createdAt}</td> */}
                            <td>{user.jobPosted.length}</td>
                            <td
                              className="edit-tr"
                              onClick={() => handleEditUser(user)}
                            >
                              <img src="./img/icons/edit.svg" alt="" />
                            </td>
                            <td
                              className="edit-tr"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Voulez-vous supprimer cet utilisateur ?"
                                  )
                                ) {
                                  handleDeleteUser(user._id);
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
      {editUserPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Modifier l'utilisateur {userToEdit.identifiant}</h3>
            <span className="cross" onClick={() => setEditUserPopup(false)}>
              &#10005;
            </span>
            <form
              action=""
              id="edit-form"
              onSubmit={() =>
                handleModificationForm(
                  userToEdit._id,
                  identifiantUpdate,
                  nomUpdate,
                  prenomUpdate,
                  emailUpdate,
                  fonctionUpdate,
                  salaireUpdate
                )
              }
            >
              <label htmlFor="identifiant">Identifiant</label>
              <br />
              <input
                type="text"
                name="identifiant"
                id="identifiant"
                defaultValue={userToEdit.identifiant}
                onChange={(e) => setIdentifiantUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="nom">Nom</label>
              <br />
              <input
                type="text"
                name="nom"
                id="nom"
                defaultValue={userToEdit.nom}
                onChange={(e) => setNomUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="prenom">Prénom</label>
              <br />
              <input
                type="text"
                name="prenom"
                id="prenom"
                defaultValue={userToEdit.prenom}
                onChange={(e) => setPrenomUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={userToEdit.email}
                onChange={(e) => setEmailUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="fonction">Fonction</label>
              <br />
              <textarea
                type="text"
                name="fonction"
                id="fonction"
                defaultValue={userToEdit.fonction}
                onChange={(e) => setFonctionUpdate(e.target.value)}
              />
              <br />
              <label htmlFor="salaire">Salaire</label>
              <br />
              <input
                type="text"
                name="salaire"
                id="salaire"
                defaultValue={userToEdit.salaire}
                onChange={(e) => setSalaireUpdate(parseInt(e.target.value))}
              />
              <br />
              <button type="submit">Valider mes modification</button>
            </form>
          </div>
        </div>
      )}
      {addUserPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Ajouter un utilisateur</h3>
            <span className="cross" onClick={() => setAddUserPopup(false)}>
              &#10005;
            </span>
            <form
              onSubmit={(e) =>
                handleNewUser(
                  e,
                  identifiantNewUser,
                  nomNewUser,
                  prenomNewUser,
                  telNewUser,
                  fonctionNewUser,
                  salaireNewUser,
                  emailNewUser,
                  passwordNewUser
                )
              }
            >
              <label htmlFor="identifiant">Identifiant</label>
              <br />
              <input
                type="text"
                name="identifiant"
                id="identifiant"
                defaultValue={identifiantNewUser}
                onChange={(e) => setIdentifiantNewUser(e.target.value)}
              />
              <br />
              <label htmlFor="nom">Nom</label>
              <br />
              <input
                type="text"
                name="nom"
                id="nom"
                defaultValue={nomNewUser}
                onChange={(e) => setNomNewUser(e.target.value)}
              />
              <br />
              <label htmlFor="prenom">Prénom</label>
              <br />
              <input
                type="text"
                name="prenom"
                id="prenom"
                defaultValue={prenomNewUser}
                onChange={(e) => setPrenomNewUser(e.target.value)}
              />
              <br />
              <label htmlFor="tel">Téléphone</label>
              <br />
              <input
                type="text"
                name="tel"
                id="tel"
                defaultValue={telNewUser}
                onChange={(e) => setTelNewUser(e.target.value)}
              />
              <br />
              <label htmlFor="fonction">Fonction</label>
              <br />
              <input
                type="text"
                name="fonction"
                id="fonction"
                defaultValue={fonctionNewUser}
                onChange={(e) => setFonctionNewUser(e.target.value)}
              />
              <br />
              <label htmlFor="salaire">Salaire</label>
              <br />
              <input
                type="text"
                name="salaire"
                id="salaire"
                defaultValue={salaireNewUser}
                onChange={(e) => setSalaireNewUser(parseInt(e.target.value))}
              />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={emailNewUser}
                onChange={(e) => setEmailNewUser(e.target.value)}
              />
              <br />
              <label htmlFor="mdp">Mot de passe</label>
              <br />
              <input
                type="text"
                name="mdp"
                id="mdp"
                defaultValue={passwordNewUser}
                onChange={(e) => setPasswordNewUser(e.target.value)}
              />
              <br />
              {(identifiantNewUser !== null || "") &&
              (nomNewUser !== null || "") &&
              (prenomNewUser !== null || "") &&
              (telNewUser !== null || "") &&
              (fonctionNewUser !== null || "") &&
              (salaireNewUser !== null || "") &&
              (emailNewUser !== null || "") &&
              (passwordNewUser !== null || "") ? (
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

export default UsersManagement;
