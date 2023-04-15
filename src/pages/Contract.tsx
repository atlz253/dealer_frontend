import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IContract from 'audio_diler_common/interfaces/IContract';
import API from '../api/API';
import Bill from '../components/Bill';
import IBill from 'audio_diler_common/interfaces/IBill';

const Contract: FC = () => {
    const { contractID } = useParams();
    const [contract, setContract] = useState<IContract | null>(null);

    useEffect(() => {
        const fetch = async () => {
            if (contractID === undefined) {
                console.error("Не удалось получить ID контракта");

                return;
            }

            const contract = await API.GetContract(contractID);

            setContract(contract);
        }

        fetch();
    }, []);

    if (contract === null) {
        return (
            <h1>
                Грузим данные (скорее всего)
            </h1>
        )
    }

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <h2>Договор №{contract.id}</h2>
            <Bill
                bill={contract.sellerBill}
                setBill={(value: IBill) => setContract({ ...contract, sellerBill: value })}
            />
            <Bill
                bill={contract.buyerBill}
                setBill={(value: IBill) => setContract({ ...contract, buyerBill: value })}
                className="mt-3"
            />
        </div>
    );
}

export default Contract;