import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FC, useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import IconButton from "../components/IconButton";
import { useNavigate } from "react-router-dom";
import IBaseClient from "dealer_common/interfaces/IBaseClient";
import API from "../api/API";
import tryServerRequest from "../utils/tryServerRequest";

const Clients: FC = () => {
    const [clients, setClients] = useState<IBaseClient[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const clients = await API.Clients.Get();

            setClients(clients as IBaseClient[]);
        });
    }, []);

    return ( 
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                <IconButton
                    icon={faPlus}
                    text="Добавить"
                    className="ms-1"
                    onClick={() => navigate("/clients/new")}
                />
            </div>
            <Table hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th>Добавлен</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client =>
                        <tr
                            key={client.id} 
                            onClick={() => navigate(`/clients/${client.id}`)}
                            style={{ cursor: "pointer" }}
                            title={`Нажмите, чтобы перейти к просмотру клиента ${client.id}`}
                        >
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.phone}</td>
                            <td>{client.added}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
     );
}
 
export default Clients;