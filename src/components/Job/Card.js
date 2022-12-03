import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { dateParser, isEmpty, upperCase } from "../utils";
import LikeButton from "./LikeButton";

const Card = ({ job }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [isApply, setIsApply] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const jobData = useSelector((state) => state.jobReducer);
  const companiesData = useSelector((state) => state.companyReducer);

  useEffect(() => {
    !isEmpty(companiesData[0] && jobData[0] && usersData[0]) &&
      setIsLoading(false);
  }, [usersData, jobData, companiesData]);

  return (
    <li className="card-container" key={job._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left"></div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {upperCase(job.titre)} pour {upperCase(job.entreprise)}
                </h3>
              </div>
              <h6>
                publié par :{" "}
                <span>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === job.auteurId)
                          return upperCase(user.identifiant);
                      })
                      .join("")}
                </span>
              </h6>
              <h6>le {dateParser(job.createdAt)}</h6>
            </div>
            <div className="card-footer">
              <h6>Le profil recherché : {job.profil}</h6>
              <h6>Les compétences impératives : {job.competence}</h6>
              <h6>Le TJM maximum: {job.tjm} €/J</h6>
              <h6>
                Localisation :{" "}
                {!isEmpty(companiesData[0]) &&
                  companiesData
                    .map((company) => {
                      if (company._id === job.companyId)
                        return company.localisation;
                    })
                    .join("")}
              </h6>
            </div>
            <div className="card-footer">
              <div className="comment-icon">
                <LikeButton job={job} />
              </div>
              <div className="comment-icon">
                <img src="./img/icons/envelope.svg" alt="candidature" />{" "}
                {job.candidat.length}
              </div>
              <NavLink to="/apply" state={{ from: job }}>
                <div className="postuler">
                  <h5>Postuler </h5>
                  <img src="./img/icons/circle-down-solid.svg" alt="" />
                </div>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
