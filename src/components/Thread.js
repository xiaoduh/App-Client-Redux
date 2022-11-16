import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../actions/job.actions";
import Card from "./Job/Card";
import { isEmpty } from "./utils";

const Thread = () => {
  const [loadJob, setLoadJob] = useState(true);
  // const [loadCompany, setLoadCompany] = useState(true);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobReducer);
  const companies = useSelector((state) => state.companyReducer);
  // const company = useSelector((state) => state.companyReducer);

  // useEffect(() => {
  //   if (loadCompany) {
  //     dispatch(getCompany());
  //     setLoadCompany(false);
  //   }
  // }, [loadCompany, dispatch]);

  useEffect(() => {
    if (loadJob) {
      dispatch(getJobs());
      setLoadJob(false);
    }
  }, [loadJob, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(jobs[0]) &&
          jobs.map((job) => {
            return <Card job={job} key={job._id} companiesData={companies} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
