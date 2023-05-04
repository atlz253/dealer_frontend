import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IAuthContext } from "../context";
import { AuthContext } from "../context";
import { admin_links, dealer_links } from "../configs/nav";

interface ISideNavProps {
    isShow: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>
}

const SideNav: FC<ISideNavProps> = ({ isShow, setIsShow }) => {
    const { auth } = useContext<IAuthContext>(AuthContext);

    let links = dealer_links;

    if (auth?.type === "admin") {
        links = admin_links;
    }

    return (
        <Offcanvas show={isShow} onHide={() => setIsShow(false)} responsive="lg">
            <Offcanvas.Header closeButton />
            <Offcanvas.Body>
                <Nav className="flex-column">
                    {links.map(link => <Link key={link.to} className="nav-link" to={link.to} onClick={() => setIsShow(false)}>{link.name}</Link>)}
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default SideNav;