import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignupForm = ({ signup }) => {
  const initialState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((cur) => ({
      ...cur,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await signup(formData);
    if (res.success) {
      history.push(`/companies`);
    } else {
      setFormErrors(res.errors);
    }
  };

  return (
    <div>
      signup form
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>First name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {formErrors ? formErrors.map(i=><p>{i}</p>) : null}

        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default SignupForm;
