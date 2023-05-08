import { FC, useState, useEffect } from 'react';
import IconButton from "../components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IBaseBill from "dealer_common/interfaces/IBaseBill";
import API from "../api/API";
import tryServerRequest from "../utils/tryServerRequest";
import { useNavigate } from "react-router-dom";
import BillsTable from '../components/BillsTable';
import Bills from '../components/Bills';
import IBill from 'dealer_common/interfaces/IBill';

const BillsPage: FC = () => {
    const [bills, setBills] = useState<IBaseBill[] | null>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const bills = await API.DealerBills.Get();

            setBills(bills as IBaseBill[]);
        });
    }, []);

    return (
        <Bills 
            bills={bills}
            setBills={setBills}
            getBill={(id: number) => API.DealerBills.GetByID(id)}
            saveBill={(bill: IBill) => API.DealerBills.Save(bill)}
            createBill={(bill: IBill) => API.DealerBills.Create(bill)}
            deleteBill={(id: number) => API.DealerBills.Delete(id)}
            className="p-1"
        />
    );
}

export default BillsPage;