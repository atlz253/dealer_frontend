import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../api/API';
import IBaseContract from '../../node_modules/audio_diler_common/interfaces/IBaseContract';
import { Link } from 'react-router-dom';
import { diler_router } from '../routers';

const Contracts: FC = () => {
    const [contracts, setContracts] = useState<IBaseContract[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const contracts: IBaseContract[] = await API.GetContracts();

            setContracts(contracts);
        }

        fetch();
    }, []);

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill" style={{ maxHeight: "50px" }}>
                <Form.Control type="text" placeholder="Поиск" />
                <Button className="w-25 ms-1">
                    <FontAwesomeIcon icon={faPlus} />
                    Составить договор
                </Button>
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
                        <tr key={contract.id} onClick={() => diler_router.navigate(`/contracts/${contract.id}`)} style={{cursor: "pointer"}}>
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