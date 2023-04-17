import IBaseUser from "audio_diler_common/interfaces/IBaseUser";
import React, { ChangeEvent, useContext, useState, KeyboardEvent } from 'react';
import { Button, Form } from "react-bootstrap";
import API from "../api/API";
import { AuthContext } from "../context";
import IconButton from "../components/IconButton";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
    const [user, setUser] = useState<IBaseUser>({ login: "", password: "" });
    const { setAuth } = useContext(AuthContext);

    const auth = async () => {
        const response = await API.Login.Login(user);

        if (response === null) {

            return;
        }

        if (response.status === 400) {
            alert("Неверный логин или пароль");

            return;
        }

        if (response.data === undefined) {
            console.error("Сервер не вернул информацию об авторизации");

            return;
        }

        sessionStorage.setItem("auth", JSON.stringify(response.data));

        setAuth(response.data);
        console.log(response);
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
                    value={user.login}
                    onChange={e => setUser({ ...user, login: e.target.value })}
                    onKeyDown={handleEnterKeyDown}
                />
                <Form.Control
                    type="password"
                    placeholder="Пароль"
                    className="mt-1"
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
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