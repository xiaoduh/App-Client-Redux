import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../utils";

const Card = ({ job }) => {
  const [isLoading, setIsLoading] = useState(true);
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
          <div className="card-left">
            {/* <h3>
              {!isEmpty(companiesData[0]) &&
                companiesData
                  .map((company) => {
                    if (company._id === job.companyId) return company.nom;
                  })
                  .join("")}
            </h3> */}
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {job.titre} pour {job.entreprise}
                </h3>
              </div>
              <span>
                publié par :{" "}
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === job.auteurId) return user.identifiant;
                    })
                    .join("")}
              </span>
              <span>le {dateParser(job.createdAt)}</span>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
