import { Modal, Button } from "react-bootstrap";
import Bill from "./Bill";
import { Dispatch, FC, SetStateAction, useEffect, useState, useRef } from "react";
import IBill from "audio_diler_common/interfaces/IBill";
import ItemPageBar from "./ItemPageBar";
import DeleteModal from "./DeleteModal";
import ApproveModal from "./ApproveModal";

interface IBillModalProps {
    bill: IBill,
    setBill: Dispatch<SetStateAction<IBill>>,
    isShow: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>,
    newBill?: boolean,
    newBillSaveAction?: () => any,
    billSaveAction?: () => any,
    billDeleteAction?: () => any
}

const BillModal: FC<IBillModalProps> = ({ bill, setBill, isShow, setIsShow, newBill, newBillSaveAction, billSaveAction, billDeleteAction }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const billBackup = useRef<IBill | null>(null);

    useEffect(() => {
        if (newBill) {
            setIsEditMode(true);
        }
    }, [newBill]);

    const saveClick = () => {
        if (newBill) {
            if (newBillSaveAction !== undefined) {
                newBillSaveAction();
            }
        }
        else {
            if (billSaveAction !== undefined) {
                billSaveAction();
            }
        }

        setIsEditMode(false);
    }

    const startEdit = () => {
        billBackup.current = structuredClone(bill);

        setIsEditMode(true);
    }

    const abortEdit = () => {
        if (billBackup.current !== null) {
            setBill(billBackup.current);
        }

        billBackup.current = null;

        setIsEditMode(false);
        setCancelEditModalShow(false);
    }

    return (
        <>
            <Modal size="lg" show={isShow} onHide={() => setIsShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение счета</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Bill
                        bill={bill}
                        setBill={setBill}
                        isEditMode={isEditMode}
                        newBill={newBill}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex flex-fill flex-column">
                        <ItemPageBar
                            isEditMode={isEditMode}
                            editClickAction={startEdit}
                            saveClickAction={saveClick}
                            deleteClickAction={() => setDeleteModalShow(true)}
                            cancelEditClickAction={() => setCancelEditModalShow(true)}
                        />
                    </div>
                </Modal.Footer>
            </Modal>
            {
                deleteModalShow &&
                <DeleteModal
                    isShow={deleteModalShow}
                    setIsShow={setDeleteModalShow}
                    title={`Удаление счета ${bill.billNumber}`}
                    body={`Вы точно хотите удалить счет ${bill.billNumber}?`}
                    onDelete={billDeleteAction}
                />
            }
            {
                cancelEditModalShow &&
                <ApproveModal
                    isShow={cancelEditModalShow}
                    setIsShow={setCancelEditModalShow}
                    title="Отмена изменений"
                    body="Вы точно хотите отменить редактирование? Измененные данные не сохранятся."
                    onApprove={abortEdit}
                />
            }
        </>
    );
}

export default BillModal;