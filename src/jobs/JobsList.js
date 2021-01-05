import React, { useState, useEffect } from "react";
import { getJobs } from "../api/api";
import JobCard from "./JobCard";
import SearchForm from "../forms/SearchForm";

const JobsList = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(function getAllJobsOnLoad() {
    search();
  }, []);

  const search = async (title) => {
    const res = await getJobs(title);
    setJobs(res);
  };
  console.log("jobs", jobs);

  if (!jobs) return <h1>Loading..</h1>;
  return (
    <div>
      <SearchForm search={search} />
      {!jobs.length
        ? `There are no matching companies`
        : jobs.map((job, idx) => (
              <JobCard key={job.id + job.title} job={job} />
          ))}
    </div>
  );
};
export default JobsList;
