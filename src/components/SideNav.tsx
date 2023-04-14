import React, { FC } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SideNav: FC = () => {
    return (
        <Nav className="flex-column">
            <Link className="nav-link" to="/contracts">Договора</Link>
            <Link className="nav-link" to="/providers">Поставщики</Link>
            <Link className="nav-link" to="/clients">Клиенты</Link>
            <Link className="nav-link" to="/products">Товары</Link>
            <Link className="nav-link" to="/bills">Счета</Link>
        </Nav>
    );
}

export default SideNav;