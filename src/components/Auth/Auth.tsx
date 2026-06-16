import { faKey } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../IconButton";
import { Form } from "react-bootstrap";
import IAuthorization from "dealer_common/interfaces/IAuthorization";
import { Dispatch, SetStateAction, KeyboardEvent, FC } from "react";
import styles from "./Auth.module.css";
import classNames from "classnames";
import { demoUsers } from "../../mocks/db";

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
            <div className={styles.credentials}>
                <div className={styles.credentialsTitle}>Доступные пользователи</div>
                {demoUsers.map(user => (
                    <div className={styles.credentialRow} key={user.id}>
                        <span className={styles.credentialRole}>{user.type}</span>
                        <span>логин: <strong>{user.login}</strong></span>
                        <span>пароль: <strong>{user.password}</strong></span>
                    </div>
                ))}
            </div>
        </Form>
    );
}

export default Auth;
