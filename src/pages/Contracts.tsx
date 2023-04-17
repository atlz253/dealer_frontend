import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../api/API';
import IBaseContract from '../../node_modules/audio_diler_common/interfaces/IBaseContract';
import { Link, redirect, useNavigate } from 'react-router-dom';
import IconButton from "../components/IconButton";
import { AuthContext, IAuthContext } from "../context";
import IResponse from "audio_diler_common/interfaces/IResponse";

const Contracts: FC = () => {
    const [contracts, setContracts] = useState<IBaseContract[]>([]);
    const {auth} = useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            if (auth === null || auth.accessToken === undefined) {
                alert("Ошибка авторизации");
    
                return;
            }

            const response = await API.Contracts.Get(auth.accessToken);

            if (response === null || response.status !== 200 || response.data === undefined) {
                console.log(response);

                return;
            }

            setContracts(response.data);
        }

        fetch();
    }, []);

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                {/* <Form.Control type="text" placeholder="Поиск" /> */}
                <IconButton
                    icon={faPlus}
                    text="Составить договор"
                    className="ms-1"
                />
            </div>
            <Table hover>
                <thead>
                    <tr>
                        <th>Номер договора</th>
                        <th>Продавец</th>
                        <th>Покупатель</th>
                        <th>Сумма</th>
                        <th>Дата создания</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map((contract: IBaseContract) =>
                        <tr
                            key={contract.id} 
                            onClick={() => navigate(`/contracts/${contract.id}`)}
                            style={{ cursor: "pointer" }}
                            title={`Нажмите, чтобы перейти к просмотру договора №${contract.id}`}
                        >
                            <td>{contract.id}</td>
                            <td>{contract.seller}</td>
                            <td>{contract.buyer}</td>
                            <td>{contract.price}</td>
                            <td>{contract.date}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Contracts;