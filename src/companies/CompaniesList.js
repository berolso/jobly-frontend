import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import { getCompanies } from "../api/api";
import SearchForm from "../forms/SearchForm";

const CompaniesList = () => {
  const [companies, setCompanies] = useState(null);

  useEffect(function getDataForInitialPageLoad() {
    // search() with empty arguments to retreive all companies
    search();
  }, []);

  const search = async (name) => {
    const res = await getCompanies(name);
    console.log(res);
    setCompanies(res);
  };

  if (!companies) return <h2>Loading...</h2>;

  return (
    <div>
      companies list
      <SearchForm search={search} />
      {!companies.length
        ? `There are no matching companies`
        : companies.map((company, idx) => (
              <CompanyCard
                key={company.handle+idx}
                handle={company.handle}
                name={company.name}
                description={company.description}
                logoUrl={company.logoUrl}
              />
          ))}
    </div>
  );
};
export default CompaniesList;
