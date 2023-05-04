import React, { FC, useContext } from 'react';
import { Navbar } from "react-bootstrap";
import IconButton from "./IconButton";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext, IAuthContext } from "../context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IHeaderProps {
    onBurgerMenuClick?: () => any
}

const Header: FC<IHeaderProps> = ({ onBurgerMenuClick }) => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext<IAuthContext>(AuthContext);

    const exit = () => {
        sessionStorage.removeItem("auth");
        setAuth(null);

        navigate("/");
    }

    return (
        <Navbar bg="light" className="d-flex flex-row-reverse justify-content-between px-1">
            <IconButton
                icon={faRightFromBracket}
                text={auth?.login}
                variant="light"
                reverse
                onClick={exit}
            />
            <FontAwesomeIcon
                icon={faBars}
                className="fs-2 d-lg-none"
                onClick={onBurgerMenuClick}
            />
        </Navbar>
    );
}

export default Header;