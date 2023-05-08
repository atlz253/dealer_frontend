import ICheque from "dealer_common/interfaces/ICheque";
import { FC, SetStateAction, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import IconButton from "./IconButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ApproveModal from "./ApproveModal";

interface IChequesTableProps {
    cheques: ICheque[],
    updateCheque?: (cheques: ICheque) => any
}

const ChequesTable: FC<IChequesTableProps> = ({ cheques, updateCheque: updateCheque }) => {
    const [approveModalShow, setApproveModalShow] = useState<boolean>(false);
    const chequeEdit = useRef<ICheque | null>(null);

    const updateChequeStatus = () => {
        if (updateCheque === undefined) {
            console.warn("Не удалось изменить статус чека из-за того, что не была передана функция изменения состояния");

            return;
        }

        if (chequeEdit.current === null) {
            return;
        }

        chequeEdit.current.status = "paid";

        updateCheque(chequeEdit.current);
        setApproveModalShow(false);
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Статус</th>
                        <th>Дата доставки</th>
                        {updateCheque && <th>Подтверждение оплаты</th>}
                    </tr>
                </thead>
                <tbody>
                    {cheques.map((cheque, index) =>
                        <tr key={cheque.id}>
                            <td>{index + 1}</td>
                            <td>{cheque.status}</td>
                            <td>{cheque.deliveryDate}</td>
                            {
                                updateCheque &&
                                (
                                    cheque.status === "unpaid" ?
                                        <td>
                                            <IconButton
                                                icon={faCheck}
                                                variant="link"
                                                onClick={() => {
                                                    chequeEdit.current = cheque;

                                                    setApproveModalShow(true);
                                                }}
                                            />
                                        </td>
                                        :
                                        <td></td>
                                )
                            }
                        </tr>
                    )}
                </tbody>
            </Table>
            <ApproveModal 
                isShow={approveModalShow}
                setIsShow={setApproveModalShow}
                title="Подтверждение оплаты"
                body="Вы точно хотите подтвердить оплату?"
                onApprove={updateChequeStatus}
            />
        </>
    );
}

export default ChequesTable;