import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { AuthContext, IAuthContext } from "../context";
import IAuth from "audio_diler_common/interfaces/IAuth";
import App from "./App";
import { diler_routes } from "../routes";
import { AppRouter } from "./AppRouter";

const Root: FC = () => {
  const [auth, setAuth] = useState<IAuth | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");

    if (auth !== null) {
      setAuth(JSON.parse(auth));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default Root;
