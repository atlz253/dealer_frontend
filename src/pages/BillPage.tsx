import { faArrowLeft, faFloppyDisk, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import ApproveModal from "../components/ApproveModal";
import DeleteModal from "../components/DeleteModal";
import IconButton from "../components/IconButton";
import NamedInput, { NamedInputType } from "../components/NamedInputs/NamedInput";
import { FC, useState, useEffect, useRef } from "react";
import IBill from "audio_diler_common/interfaces/IBill";
import Bill from "../components/Bill";
import { useNavigate, useParams } from "react-router-dom";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";

interface IBillProps {
    newBill?: boolean
}

const BillPage: FC<IBillProps> = ({ newBill }) => {
    const { billID } = useParams();
    const [bill, setBill] = useState<IBill>({
        id: 0,
        correspondentBill: "",
        BIC: "",
        INN: "",
        ownerName: "",
        billNumber: "",
        bankName: "",
        expireDate: "",
        ownerType: ""
    });
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const billBackup = useRef<IBill | null>(null);

    useEffect(() => {
        if (newBill) {
            setIsEditMode(true);

            return;
        }

        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const bill = await API.Bills.GetByID(Number(billID));

            setBill(bill);
        });
    }, []);

    const backClick = () => {
        if (isEditMode) {
            setCancelEditModalShow(true);
        }
        else {
            navigate("/bills");
        }
    }

    const abortEdit = () => {
        if (newBill) {
            navigate("/bills");

            return;
        }

        if (billBackup.current !== null) {
            setBill(billBackup.current);
        }
        else
        {
            console.error("Не удалось восстановить резервную копию счета");
        }

        setIsEditMode(false);
        setCancelEditModalShow(false);
    }

    const saveBill = async () => {
        billBackup.current = null;

        tryServerRequest(async () => {
            if (newBill) {
                const response = await API.Bills.Create(bill);

                setBill({ ...bill, id: response.id });
            }
            else {
                await API.Bills.Save(bill);
            }

            setIsEditMode(false);
        });
    }

    const editBill = () => {
        billBackup.current = structuredClone(bill);

        setIsEditMode(true);
    }

    const deleteBill = () => {
        tryServerRequest(async () => {
            await API.Bills.Delete(Number(billID));

            navigate("/bills");
        });
    }

    return (
        <>
            <div className="d-flex flex-fill flex-column p-1">
                <div className="d-flex justify-content-between">
                    <IconButton
                        icon={faArrowLeft}
                        variant="secondary"
                        text="Назад"
                        onClick={backClick}
                    />
                    {
                        isEditMode ?
                            <div>
                                <IconButton
                                    icon={faFloppyDisk}
                                    variant="success"
                                    text="Сохранить"
                                    onClick={saveBill}
                                />
                            </div>
                            :
                            <div>
                                <IconButton
                                    icon={faPen}
                                    variant="secondary"
                                    text="Изменить"
                                    onClick={editBill}
                                />
                                <IconButton
                                    icon={faTrash}
                                    variant="danger"
                                    text="Удалить"
                                    onClick={() => setDeleteModalShow(true)}
                                    className="ms-1"
                                />
                            </div>
                    }

                </div>
                <h1 className="text-center">{bill.billNumber}</h1>
                <Bill
                    bill={bill}
                    setBill={setBill}
                    isEditMode={isEditMode}
                    newBill={newBill}
                />
            </div>
            <DeleteModal
                isShow={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                title="Удаление счета"
                body={`Вы действительно хотите удалить счет ${bill.billNumber}?`}
                onDelete={deleteBill}
            />
            {
                isEditMode &&
                <ApproveModal
                    isShow={cancelEditModalShow}
                    onHide={() => setCancelEditModalShow(false)}
                    title="Отмена изменений"
                    body="Вы точно хотите отменить редактирование? Измененные данные не сохранятся."
                    onApprove={abortEdit}
                />
            }
        </>
    );
}

export default BillPage;