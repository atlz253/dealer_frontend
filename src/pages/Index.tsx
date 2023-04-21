import React, { FC, useContext } from 'react';
import { AuthContext, IAuthContext } from "../context";

const Index: FC = () => {
    const { auth } = useContext<IAuthContext>(AuthContext);

    return (
        <div className="d-flex flex-column align-items-center flex-fill mt-5">
            <h2>Здравствуйте, {auth?.login}!</h2>
            <h2>Выберите в меню слева желаемое действие</h2>
        </div>
    );
}

export default Index;