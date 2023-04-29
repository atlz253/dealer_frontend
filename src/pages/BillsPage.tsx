import { FC, useState, useEffect } from 'react';
import IconButton from "../components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IBaseBill from "audio_diler_common/interfaces/IBaseBill";
import API from "../api/API";
import tryServerRequest from "../utils/tryServerRequest";
import { useNavigate } from "react-router-dom";
import BillsTable from '../components/BillsTable';

const Bills: FC = () => {
    const [bills, setBills] = useState<IBaseBill[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const bills = await API.Bills.Get();

            setBills(bills);
        });
    }, []);

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                <IconButton
                    icon={faPlus}
                    text="Добавить"
                    className="ms-1"
                    onClick={() => navigate("/bills/new")}
                />
            </div>
            <BillsTable 
                bills={bills}
                onRowClick={(id: number) => navigate(`/bills/${id}`)}
            />
        </div>
    );
}

export default Bills;