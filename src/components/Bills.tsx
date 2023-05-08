import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BillModal from "./BillModal";
import BillsTable from "./BillsTable";
import IconButton from "./IconButton";
import { Dispatch, FC, SetStateAction, useState } from "react";
import IBaseBill from "dealer_common/interfaces/IBaseBill";
import IBill from "dealer_common/interfaces/IBill";
import tryServerRequest from "../utils/tryServerRequest";
import ID from "dealer_common/interfaces/ID";
import classNames from "classnames";

interface IBillsProps {
    bills: IBaseBill[] | null,
    setBills: Dispatch<SetStateAction<IBaseBill[] | null>>,
    getBill: (id: number) => Promise<IBill>,
    createBill: (bill: IBill) => Promise<ID>,
    saveBill: (bill: IBill) => Promise<void>,
    deleteBill: (id: number) => Promise<void>,
    className?: string
}

const Bills: FC<IBillsProps> = ({ bills, setBills, getBill, createBill, saveBill, deleteBill, className }) => {
    const [editBillModal, setEditBillModal] = useState<boolean>(false);
    const [editBill, setEditBill] = useState<IBill>({
        id: 0,
        correspondentBill: "",
        BIC: "",
        INN: "",
        ownerName: "",
        billNumber: "",
        bankName: "",
        expireDate: ""
    });
    const [newBill, setNewBill] = useState<boolean>(false);

    const addNewBillClick = () => {
        setNewBill(true);

        setEditBill({
            id: 0,
            correspondentBill: "",
            BIC: "",
            INN: "",
            ownerName: "",
            billNumber: "",
            bankName: "",
            expireDate: ""
        });

        setEditBillModal(true);
    }

    const openBill = (id: number) => {
        tryServerRequest(async () => {
            const bill = await getBill(id);

            if (newBill) {
                setNewBill(false);
            }

            setEditBill(bill);

            setEditBillModal(true);
        });
    }

    const saveNewBill = () => {
        tryServerRequest(async () => {
            const result = await createBill(editBill);

            const bill = { ...editBill, id: result.id };

            if (bills !== null) {
                setBills([...bills, bill])
            }

            setEditBill(bill);
        });
    }

    const saveBillAction = () => {
        tryServerRequest(async () => {
            await saveBill(editBill);

            if (bills !== null) {
                setBills(bills.map(bill => {
                    if (bill.id === editBill.id) {
                        return editBill;
                    }

                    return bill;
                }));
            }
        });
    }

    const deleteBillAction = () => {
        tryServerRequest(async () => {
            await deleteBill(editBill.id);

            if (bills !== null) {
                setBills(bills.filter(bill => bill.id !== editBill.id));
            }

            setEditBillModal(false);
        });
    }

    return (
        <>
            <div className={classNames("d-flex flex-fill flex-column", className)}>
                <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                    <IconButton
                        icon={faPlus}
                        text="Добавить"
                        className="ms-1"
                        onClick={addNewBillClick}
                    />
                </div>
                {
                    bills !== null &&
                    <BillsTable
                        bills={bills}
                        onRowClick={openBill}
                    />
                }

            </div>
            {
                editBillModal &&
                <BillModal
                    isShow={editBillModal}
                    setIsShow={setEditBillModal}
                    bill={editBill}
                    setBill={setEditBill}
                    newBill={newBill}
                    newBillSaveAction={saveNewBill}
                    billDeleteAction={deleteBillAction}
                    billSaveAction={saveBillAction}
                />
            }
        </>
    );
}

export default Bills;