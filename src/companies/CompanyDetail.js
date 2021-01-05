import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCard from "../jobs/JobCard";
import { getCompany } from "../api/api";

const CompanyDetail = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const getCompanyFromURL = async () => {
      const res = await getCompany(handle);
      console.log("res", res[0]);
      setCompany(res);
    };
    getCompanyFromURL(handle);
  },[handle]);

  if (!company) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{company.name}</h1>
      <img src={company.logoUrl} alt={company.name} />
      <p>{company.description}</p>
      <h3>{company.numEmployees}</h3>
      {company.jobs.length > 0 && <h2>Job listings:</h2>}
      {company.jobs.length ? company.jobs.map((job) => (
        <JobCard key={job.id + job.title} job={job} />
      )) : 'There are no job listings'}
    </div>
  );
};
export default CompanyDetail;
