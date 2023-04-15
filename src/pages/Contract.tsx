import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IContract from 'audio_diler_common/interfaces/IContract';
import API from '../api/API';
import Bill from '../components/Bill';
import IBill from 'audio_diler_common/interfaces/IBill';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { diler_router } from "../routers";
import IconButton from "../components/IconButton";
import DeleteModal from "../components/DeleteModal";
import { Table } from "react-bootstrap";
import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";

const Contract: FC = () => {
    const { contractID } = useParams();
    const [contract, setContract] = useState<IContract | null>(null);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);

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

    const deleteContract = () => {
        diler_router.navigate("/contracts");
    }

    if (contract === null) {
        return (
            <h1>
                Грузим данные (скорее всего)
            </h1>
        )
    }

    return (
        <>
            <div className="d-flex flex-fill flex-column p-1">
                <div className="d-flex justify-content-between">
                    <IconButton 
                        icon={faArrowLeft}
                        variant="secondary"
                        text="Назад"
                        onClick={() => diler_router.navigate("/contracts")}
                    />
                    <IconButton 
                        icon={faTrash}
                        variant="danger"
                        text="Удалить"
                        onClick={() => setDeleteModalShow(true)}
                    />
                </div>
                <h1 className="text-center">
                    Договор №{contract.id}
                </h1>
                <h2>
                    Счет продавца
                </h2>
                <Bill
                    bill={contract.sellerBill}
                    setBill={(value: IBill) => setContract({ ...contract, sellerBill: value })}
                    isEditMode={true}
                />
                <h2 className="mt-3">
                    Счет покупателя
                </h2>
                <Bill
                    bill={contract.buyerBill}
                    setBill={(value: IBill) => setContract({ ...contract, buyerBill: value })}
                    isEditMode={true}
                />
                <h2 className="mt-3">
                    Товары
                </h2>
                <Table hover>
                    <thead>
                        <tr>
                            <td>№</td>
                            <td>Наименование товара</td>
                            <td>Количество</td>
                            <td>Стоимость</td>
                        </tr>
                    </thead>
                    <tbody>
                        {contract.products.map((product: IBaseProduct, index: number) =>
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <DeleteModal 
                isShow={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                title="Удаление договора"
                body={`Вы действительно хотите удалить договор №${contract.id}?`}
                onDelete={deleteContract}
            />
        </>
    );
}

export default Contract;