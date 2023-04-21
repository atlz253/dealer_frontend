import IBaseUser from "audio_diler_common/interfaces/IBaseUser";
import React, { ChangeEvent, useContext, useState, KeyboardEvent } from 'react';
import { Button, Form } from "react-bootstrap";
import API from "../api/API";
import { AuthContext } from "../context";
import IconButton from "../components/IconButton";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import ILoginData from "audio_diler_common/interfaces/ILoginData"
import tryServerRequest from "../utils/tryServerRequest";

const Auth = () => {
    const [loginData, setLoginData] = useState<ILoginData>({ login: "", password: "" });
    const { setAuth } = useContext(AuthContext);

    const auth = async () => {
        tryServerRequest(async () => {
            const response = await API.Login.Login(loginData);
            
            sessionStorage.setItem("auth", JSON.stringify(response));
            
            setAuth(response);
        });
    }

    const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            auth();
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <Form className="w-25 m-5">
                <Form.Control
                    type="text"
                    placeholder="Логин"
                    value={loginData.login}
                    onChange={e => setLoginData({ ...loginData, login: e.target.value })}
                    onKeyDown={handleEnterKeyDown}
                />
                <Form.Control
                    type="password"
                    placeholder="Пароль"
                    className="mt-1"
                    value={loginData.password}
                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                    onKeyDown={handleEnterKeyDown}
                />
                <div className="d-flex flex-row-reverse">
                    <IconButton 
                        icon={faKey}
                        variant="success"
                        className="mt-1"
                        text="Вход"
                        onClick={auth}
                    />
                </div>
            </Form>
        </div>
    );
}

export default Auth;