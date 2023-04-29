import IBaseBill from "audio_diler_common/interfaces/IBaseBill";
import { FC } from "react";
import { Table } from "react-bootstrap";

interface IBillsTableProps {
    bills: IBaseBill[],
    onRowClick?: (id: number) => any
}

const BillsTable: FC<IBillsTableProps> = ({bills, onRowClick}) => {
    return (
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
                        onClick={onRowClick ? () => onRowClick(bill.id) : undefined}
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
    );
}

export default BillsTable;