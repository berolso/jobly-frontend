import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginForm = ({ login }) => {
  const [formData, setFormData] = useState({
    userName: "testuser",
    password: "password",
  });
  const [formErrors, setFormErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await login(formData.userName, formData.password);
    console.log(res);
    if (res.success) {
      history.push("/companies");
    } else {
      console.log("res.err", res.err);
      setFormErrors(res.err);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((cur) => ({ ...cur, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name: </label>
          <input
            id="userName"
            name="userName"
            onChange={handleChange}
            value={formData.userName} 
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div>{formErrors.length ? formErrors : null}</div>
        <button>Enter</button>
      </form>
    </div>
  );
};
export default LoginForm;
