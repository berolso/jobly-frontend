import React, { useState } from "react";

const SearchForm = ({ search }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault()
    search(input.trim() || undefined)
  };

  const handleChange = (evt) => {
    const name = evt.target.value;
    setInput(name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchInput">search: </label>
        <input
          id="searchInput"
          name="search"
          onChange={handleChange}
          value={input}
        />
      </form>
    </div>
  );
};
export default SearchForm;
