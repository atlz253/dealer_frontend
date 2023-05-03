import { FC, useEffect, useState } from 'react';
import IBaseProvider from "audio_diler_common/interfaces/IBaseProvider";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../components/IconButton';
import { Table } from 'react-bootstrap';
import API from '../api/API';
import tryServerRequest from '../utils/tryServerRequest';
import { useNavigate } from 'react-router-dom';

const Providers: FC = () => {
    const [providers, setProviders] = useState<IBaseProvider[]>([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const providers = await API.Providers.Get();

            setProviders(providers as IBaseProvider[]);
        });
    }, []);

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                <IconButton
                    icon={faPlus}
                    text="Добавить"
                    className="ms-1"
                    onClick={() => navigate("/providers/new")}
                />
            </div>
            <Table hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Добавлен</th>
                    </tr>
                </thead>
                <tbody>
                    {providers.map(provider =>
                        <tr
                            key={provider.id} 
                            onClick={() => navigate(`/providers/${provider.id}`)}
                            style={{ cursor: "pointer" }}
                            title={`Нажмите, чтобы перейти к просмотру поставщика ${provider.id}`}
                        >
                            <td>{provider.id}</td>
                            <td>{provider.name}</td>
                            <td>{provider.added}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Providers;
