import React, { ChangeEvent, useContext, useState, KeyboardEvent } from 'react';
import { Button, Form } from "react-bootstrap";
import API from "../api/API";
import { AuthContext } from "../context";
import IconButton from "../components/IconButton";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import tryServerRequest from "../utils/tryServerRequest";
import IAuthorization from 'dealer_common/interfaces/IAuthorization';
import Auth from '../components/Auth/Auth';

const AuthPage = () => {
    const [loginData, setLoginData] = useState<IAuthorization>({ login: "", password: "" });
    const { setAuth } = useContext(AuthContext);

    const auth = async () => {
        tryServerRequest(async () => {
            const response = await API.Login.Login(loginData);
            
            sessionStorage.setItem("auth", JSON.stringify(response));
            
            setAuth(response);
        });
    }

    return (
        <div className="d-flex justify-content-center">
            <Auth 
                loginData={loginData}
                setLoginData={setLoginData}
                onSubmit={auth}
            />
        </div>
    );
}

export default AuthPage;