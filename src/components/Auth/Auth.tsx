import { faKey } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../IconButton";
import { Form } from "react-bootstrap";
import IAuthorization from "dealer_common/interfaces/IAuthorization";
import { Dispatch, SetStateAction, KeyboardEvent, FC } from "react";
import styles from "./Auth.module.css";
import classNames from "classnames";

interface IAuthProps {
    loginData: IAuthorization,
    setLoginData: Dispatch<SetStateAction<IAuthorization>>,
    onSubmit?: () => any
}

const Auth: FC<IAuthProps> = ({ loginData, setLoginData, onSubmit }) => {
    const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (onSubmit && event.code === "Enter") {
            onSubmit();
        }
    }

    return (
        <Form className={classNames(styles.auth, "m-5")}>
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
                    onClick={onSubmit}
                />
            </div>
        </Form>
    );
}

export default Auth;