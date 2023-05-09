import { FC } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import IconButton from "../components/IconButton";
import Contracts from '../components/Contracts/Contracts';
import useContracts from '../hooks/useContracts';
import { Spinner } from 'react-bootstrap';

const ContractsPage: FC = () => {
    const [contracts, setContracts, isContractsLoading] = useContracts();
    const navigate = useNavigate();

    if (isContractsLoading) {
        return (
            <div className="d-flex flex-fill justify-content-center align-items-center p-1">
                <Spinner animation="border" />
            </div>
        )
    }

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