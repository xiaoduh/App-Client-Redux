import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../actions/job.actions";
import Card from "./Job/Card";
import { isEmpty } from "./utils";

const Thread = () => {
  const [loadJob, setLoadJob] = useState(true);
  const [count, setCount] = useState(5);
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

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadJob(true);
    }
  };

  useEffect(() => {
    if (loadJob) {
      dispatch(getJobs(count));
      setLoadJob(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadJob, dispatch, count]);

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
