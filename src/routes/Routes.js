import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/HomePage";
import LoginForm from "../auth/LoginForm";
import CompaniesList from "../companies/CompaniesList";
import CompanyDetail from "../companies/CompanyDetail";
import JobsList from "../jobs/JobsList";
import UserProfile from "../user/UserProfile";
import SignupForm from "../auth/SignupForm";
import UserContext from "../auth/UserContext";

const Routes = ({ login, signup }) => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>
        <Route exact path="/companies">
          {currentUser ? <CompaniesList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/companies/:handle">
          {currentUser ? <CompanyDetail /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/jobs">
          {currentUser ? <JobsList /> : <Redirect to="/login" />}
          <JobsList />
        </Route>
        <Route path="/profile">
          {currentUser ? <UserProfile /> : <Redirect to="/login" />}
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
