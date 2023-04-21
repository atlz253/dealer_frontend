import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { admin_routes, dealer_routes } from "../configs/routes";
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

    let routes = dealer_routes;

    if (auth.type === "admin") {
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