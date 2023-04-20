import React, { FC, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IAuthContext } from "../context";
import { AuthContext } from "../context";
import { admin_links, dealer_links } from "../configs/nav";

const SideNav: FC = () => {
    const { auth } = useContext<IAuthContext>(AuthContext);

    let links = dealer_links;

    if (auth?.role === "admin") {
        links = admin_links;
    }

    return (
        <Nav className="flex-column">
            {links.map(link => <Link className="nav-link" to={link.to}>{link.name}</Link>)}
        </Nav>
    );
}

export default SideNav;