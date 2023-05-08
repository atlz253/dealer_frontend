import IBaseContract from "dealer_common/interfaces/IBaseContract";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Contracts.module.css";

interface IContractsProps {
    contracts: IBaseContract[],
    setContracts: Dispatch<SetStateAction<IBaseContract[]>>
}

const Contracts: FC<IContractsProps> = ({ contracts, setContracts }) => {
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState<boolean>(false);
    const [sortType, setSortType] = useState<string>("ID");

    const sortByContractID = () => {
        let order = sortOrder;

        if (sortType === "ID") {
            order = !sortOrder;

            setSortOrder(!sortOrder);
        }
        else {
            setSortType("ID");
        }

        setContracts(contracts.sort((a, b) => order ? b.id - a.id : a.id - b.id));
    };

    const sortByContractType = () => {
        let order = sortOrder;

        if (sortType === "type") {
            order = !sortOrder;

            setSortOrder(!sortOrder);
        }
        else {
            setSortType("type");
        }

        setContracts(contracts.sort((a, b) => {
            if (a.type === b.type) {
                return 0;
            }
            if (a.type === "sell") {
                return order ? -1 : 1;
            }
            else {
                return order ? 1 : -1;
            }
        }));
    }

    const sortByStatusType = () => {
        let order = sortOrder;

        if (sortType === "status") {
            order = !sortOrder;

            setSortOrder(!sortOrder);
        }
        else {
            setSortType("status");
        }

        setContracts(contracts.sort((a, b) => {
            if (a.status === b.type) {
                return 0;
            }
            if (a.status === "open") {
                return order ? -1 : 1;
            }
            else {
                return order ? 1 : -1;
            }
        }));
    }

    return (
        <Table hover>
            <thead className={styles.head}>
                <tr>
                    <th
                        onClick={sortByContractID}
                        style={{ cursor: "pointer" }}
                    >
                        Номер договора
                    </th>
                    <th>Продавец</th>
                    <th>Покупатель</th>
                    <th
                        onClick={sortByContractType}
                        style={{cursor: "pointer"}}
                    >
                        Тип договора
                    </th>
                    <th
                        onClick={sortByStatusType}
                        style={{cursor: "pointer"}}
                    >
                        Статус
                    </th>
                    <th>Сумма</th>
                    <th>Дата создания</th>
                </tr>
            </thead>
            <tbody className={styles.body}>
                {contracts.map((contract: IBaseContract) =>
                    <tr
                        key={contract.id}
                        onClick={() => navigate(`/contracts/${contract.id}`)}
                        className={styles.row}
                        title={`Нажмите, чтобы перейти к просмотру договора №${contract.id}`}
                    >
                        <td
                            cell-name="Номер договора"
                            className={styles.cell}
                        >
                            {contract.id}
                        </td>
                        <td
                            cell-name="Продавец"
                            className={styles.cell}
                        >
                            {contract.sellerName}
                        </td>
                        <td
                            cell-name="Покупатель"
                            className={styles.cell}
                        >
                            {contract.buyerName}
                        </td>
                        <td
                            cell-name="Тип договора"
                            className={styles.cell}
                        >
                            {contract.type}
                        </td>
                        <td
                            cell-name="Статус"
                            className={styles.cell}
                        >
                            {contract.status}
                        </td>
                        <td
                            cell-name="Сумма"
                            className={styles.cell}
                        >
                            {contract.price}
                        </td>
                        <td
                            cell-name="Дата создания"
                            className={styles.cell}
                        >
                            {contract.created}
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default Contracts;