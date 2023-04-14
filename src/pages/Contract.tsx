import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IContract from 'audio_diler_common/interfaces/IContract';
import API from '../api/API';
import { Form } from 'react-bootstrap';

const Contract: FC = () => {
    const { contractID } = useParams();
    const [contract, setContract] = useState<IContract | null>(null);

    useEffect(() => {
        const fetch = async () => {
            if (contractID === undefined)
            {
                console.error("Не удалось получить ID контракта");

                return;
            }

            const contract = await API.GetContract(contractID);

            setContract(contract);
        }
        
        fetch();
    }, []);

    if (contract === null)
    {
        return (
            <h1>
                Грузим данные (скорее всего)
            </h1>
        )
    }

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <h2>Договор №{contract.id}</h2>
            <div>
                <div className="d-flex align-items-center mt-1">
                    <div style={{width: "150px"}}>
                        <b>Продавец</b>
                    </div>
                    <Form.Control type="text" value={contract.buyerBill.ownerName} className="ms-1" />
                </div>
                <div className="d-flex align-items-center mt-1">
                    <div style={{width: "150px"}}>
                        <b>Расчетный счет</b>
                    </div>
                    <Form.Control type="text" value={contract.buyerBill.billNumber} className="ms-1" />
                </div>
                <div className="d-flex align-items-center mt-1">
                    <div style={{width: "150px"}}>
                        <b>Банк</b>
                    </div>
                    <Form.Control type="text" value={contract.buyerBill.bankName} className="ms-1" />
                </div>
                <div className="d-flex align-items-center mt-1">
                    <div style={{width: "150px"}}>
                        <b>Корр. счет</b>
                    </div>
                    <Form.Control type="text" value={contract.buyerBill.correspondentBill} className="ms-1" />
                </div>
                <div className="d-flex align-items-center mt-1">
                    <div style={{width: "150px"}}>
                        <b>БИК</b>
                    </div>
                    <Form.Control type="text" value={contract.buyerBill.BIC} className="ms-1" />
                </div>
                <div className="d-flex align-items-center mt-1">
                    <div style={{width: "150px"}}>
                        <b>ИНН</b>
                    </div>
                    <Form.Control type="text" value={contract.buyerBill.INN} className="ms-1" />
                </div>
            </div>
        </div>
    );
}

export default Contract;