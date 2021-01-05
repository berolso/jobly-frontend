import React from "react";
import UserContext from "../auth/UserContext";
import { applyToJob } from "../api/api";

const JobCard = ({ job }) => {
  const { currentUser } = React.useContext(UserContext);
  const [hasApplied, setHasApplied] = React.useState(
    currentUser.applications.includes(job.id)
  );

  const handleClick = () => {
    applyToJob(currentUser.username, job.id);
    setHasApplied(true);
  };

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.companyName}</p>
      <h3>Salary: ${job.salary}</h3>
      <h3>Equity: {job.equity}</h3>
      {hasApplied ? (
        <button deactive='true'>Already Applied</button>
      ) : (
        <button onClick={handleClick}>Apply</button>
      )}
    </div>
  );
};
export default JobCard;
