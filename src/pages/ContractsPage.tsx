import { FC, useEffect, useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import API from '../api/API';
import IBaseContract from 'audio_diler_common/interfaces/IBaseContract';
import { useNavigate } from 'react-router-dom';
import IconButton from "../components/IconButton";
import tryServerRequest from '../utils/tryServerRequest';
import Contracts from '../components/Contracts/Contracts';

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
            <Contracts 
                contracts={contracts}
                setContracts={setContracts}
            />
        </div>
    );
}

export default ContractsPage;