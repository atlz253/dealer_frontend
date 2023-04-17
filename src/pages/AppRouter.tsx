import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { admin_routes, diler_routes } from "../routes";
import App from "./App";
import { AuthContext } from "../context";
import Auth from "./Auth";

export const AppRouter = () => {
    const {auth} = useContext(AuthContext);

    if (auth === null) // Пользователь не авторизован
    {
        return (
            <Auth />
        )
    }

    let routes = diler_routes;

    if (auth.role === "admin") {
        routes = admin_routes;
    }

    return (
        <Routes>
            <Route element={<App />}>
                {routes.map(route => <Route key={route.path} path={route.path} element={route.element} />)}
            </Route>
        </Routes>
    );
}