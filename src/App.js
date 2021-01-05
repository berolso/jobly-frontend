import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes/Navigation";
import Routes from "./routes/Routes";
import { loginUser, getCurrentUser, signUpUser } from "./api/api";
import jwt from "jsonwebtoken";
import UserContext from "./auth/UserContext";
import useLocalStorage from './hooks/useLocalStorage'
import "./App.css";

function App() {
  // const [initialLoad, setInitialLoad] = useState([]);
  // const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage('userToken');


  // useEffect(() => {
  //   async function getAllCompanies() {
  //     const res = await getCompanies();
  //     setInitialLoad(res);
  //   }
  //   getAllCompanies();
  // }, []);

  useEffect(
    function loadUserInfo() {
      async function getUserFromAPI() {
        if (token) {
          try {
            const { username } = jwt.decode(token);
            const curUser = await getCurrentUser(username);
            setCurrentUser(curUser);
          } catch (err) {
            setCurrentUser(null);
          }
        }
      }
      getUserFromAPI();
    },
    [token]
  );

  const login = async (userName, password) => {
    try {
      const token = await loginUser(userName, password);
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  async function signUp(formData) {
    try {
      const token = await signUpUser(formData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navigation logout={logout} />
          <Routes login={login} signup={signUp}/>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
