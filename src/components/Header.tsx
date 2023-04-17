import React, { useContext } from 'react';
import { Navbar } from "react-bootstrap";
import IconButton from "./IconButton";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext, IAuthContext } from "../context";

const Header = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext<IAuthContext>(AuthContext);

    const exit = () => {
        sessionStorage.removeItem("auth");
        setAuth(null);

        navigate("/");
    }

    return (
        <Navbar bg="light" className="d-flex flex-row-reverse px-1">
            <IconButton
                icon={faRightFromBracket}
                text="Логин"
                variant="light"
                reverse
                onClick={exit}
            />
        </Navbar>
    );
}

export default Header;