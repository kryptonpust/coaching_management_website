import BasePage from "pages/BasePage";
import Login from "pages/LoginPage";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthContext from "./context/auth_context";
import AdminRoot from "./pages/admin";


function App(props) {
  const [token, settoken] = useState(null);
  const login = token => {
    settoken(token);
  };
  const logout = () => {
    settoken(null);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider
          value={{ token: token, login: login, logout: logout }}
        >
          <Switch>
            {token && (
              <Route path="/admin">
                <AdminRoot />
              </Route>
            )}
            {!token && (
              <Route path="/login">
                <Login />
              </Route>
            )}
            {!token && (
              <Route path="/">
                <BasePage />
              </Route>
            )}
          </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
