import React from "react";
import {Link} from 'react-router-dom'

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  return (
    <Link to={`/companies/${handle}`} >
      <div style={{ margin:'10px' }}>
        <div>{handle}</div>
        <div>{name}</div>
        <div>{description}</div>
        <img alt={name} src={logoUrl}/>
      </div>
    </Link>
  );
};
export default CompanyCard;
