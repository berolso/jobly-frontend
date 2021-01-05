import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { updateProfile } from "../api/api";

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // console.debug(
  //   "ProfileForm",
  //   "currentUser=",
  //   currentUser,
  //   "formData=",
  //   formData,
  //   "formErrors=",
  //   formErrors
  // );

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };
    const username = formData.username;

    let updatedUser;
    try {
      updatedUser = await updateProfile(username, profileData);
      setCurrentUser(updatedUser);
      setFormErrors([])
    } catch (errors) {
      console.log(errors);
      setFormErrors(errors);
    }
    setFormData((f) => ({ ...f, password: "" }));
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((cur) => ({ ...cur, [name]: value }));
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
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
        <button>Save</button>
      </form>
      <div>{formErrors ? formErrors.map((i) => <p>{i}</p>) : null}</div>
    </div>
  );
};
export default UserProfile;
