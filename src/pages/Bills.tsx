import { FC, useState, useEffect } from 'react';
import IconButton from "../components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IBaseContract from "audio_diler_common/interfaces/IBaseContract";
import { Table } from "react-bootstrap";
import IBaseBill from "audio_diler_common/interfaces/IBaseBill";
import API from "../api/API";
import tryServerRequest from "../utils/tryServerRequest";
import { useNavigate } from "react-router-dom";

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
            <Table hover>
                <thead>
                    <tr>
                        <th>Номер счёта</th>
                        <th>Владелец</th>
                        <th>Банк</th>
                        <th>Действителен до</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map(bill =>
                        <tr
                            key={bill.id} 
                            onClick={() => navigate(`/bills/${bill.id}`)}
                            style={{ cursor: "pointer" }}
                            title={`Нажмите, чтобы перейти к просмотру счёта ${bill.billNumber}`}
                        >
                            <td>{bill.billNumber}</td>
                            <td>{bill.ownerName}</td>
                            <td>{bill.bankName}</td>
                            <td>{bill.expireDate}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Bills;