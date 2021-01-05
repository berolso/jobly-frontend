import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = () => {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/companies">companies</NavLink>
          </li>
          <li>
            <NavLink to="/jobs">jobs</NavLink>
          </li>
          <li>
            <NavLink to="/profile">profile</NavLink>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              log out
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const loggedOutNav = () => {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/signup">signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">login</NavLink>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </ul>
    </div>
  );
};

export default Navigation;
