import IBaseContract from "audio_diler_common/interfaces/IBaseContract";
import { FC } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Contracts.module.css";

interface IContractsProps {
    contracts: IBaseContract[]
}

const Contracts: FC<IContractsProps> = ({ contracts }) => {
    const navigate = useNavigate();

    return (
        <Table hover>
            <thead className={styles.head}>
                <tr>
                    <th>Номер договора</th>
                    <th>Продавец</th>
                    <th>Покупатель</th>
                    <th>Тип договора</th>
                    <th>Статус</th>
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