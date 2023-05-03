import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../api/API';
import IBaseContract from 'audio_diler_common/interfaces/IBaseContract';
import { Link, redirect, useNavigate } from 'react-router-dom';
import IconButton from "../components/IconButton";
import { AuthContext, IAuthContext } from "../context";
import IResponse from "audio_diler_common/interfaces/IResponse";
import tryServerRequest from '../utils/tryServerRequest';

const ContractsPage: FC = () => {
    const [contracts, setContracts] = useState<IBaseContract[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const contracts = await API.Contracts.Get();

            setContracts(contracts);
        });
    }, []);

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                <IconButton
                    icon={faPlus}
                    text="Составить договор"
                    className="ms-1"
                    onClick={() => navigate("/contracts/new")}
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
                            <td>{contract.sellerName}</td>
                            <td>{contract.buyerName}</td>
                            <td>{contract.price}</td>
                            <td>{contract.created}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default ContractsPage;