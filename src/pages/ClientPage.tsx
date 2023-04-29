import { FC, useEffect, useState, useRef } from "react";
import ItemPage from "../components/ItemPage";
import IClient from "audio_diler_common/interfaces/IClient";
import { useNavigate, useParams } from "react-router-dom";
import Client from "../components/Client";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import Categories from "../components/ItemAccordion/Categories";
import IBaseBill from "audio_diler_common/interfaces/IBaseBill";
import BillsTable from "../components/BillsTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../components/IconButton";
import { Button, Modal } from "react-bootstrap";
import Bill from "../components/Bill";
import BillModal from "../components/BillModal";
import IBill from "audio_diler_common/interfaces/IBill";

interface ClientPageProps {
    newClient?: boolean
}

// TODO: сохранять полную информацию о счете при его получении
const ClientPage: FC<ClientPageProps> = ({ newClient }) => {
    const { clientID } = useParams();
    const [client, setClient] = useState<IClient>({
        id: 0,
        email: "",
        birthday: "",
        name: "",
        address: "",
        phone: "",
        added: ""
    });
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const clientBackup = useRef<IClient | null>(null);
    const [bills, setBills] = useState<IBaseBill[] | null>(null);
    const [editBillModal, setEditBillModal] = useState<boolean>(false);
    const [editBill, setEditBill] = useState<IBill>({
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
    const [newBill, setNewBill] = useState<boolean>(false);

    useEffect(() => {
        if (newClient) {
            setIsEditMode(true);

            return;
        }

        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const client = await API.Clients.GetByID(Number(clientID));

            setClient(client);
        });
    }, []);

    const saveClient = () => {
        clientBackup.current = null;

        tryServerRequest(async () => {
            if (newClient) {
                const result = await API.Clients.Create(client);

                setClient({ ...client, id: result.id });
            }
            else {
                await API.Clients.Save(client);
            }

            setIsEditMode(false);
        });
    }

    const abortEdit = () => {
        if (newClient) {
            navigate("/clients");

            return;
        }

        if (clientBackup.current !== null) {
            setClient(clientBackup.current);
        }
        else {
            console.error("Не удалось восстановить резервную копию");
        }

        setIsEditMode(false);
        setCancelEditModalShow(false);
    }

    const editClick = () => {
        clientBackup.current = client;

        setIsEditMode(true);
    }

    const deleteClient = () => {
        tryServerRequest(async () => {
            await API.Clients.Delete(client.id);

            navigate("/clients");
        });
    }

    const openBills = () => {
        if (bills !== null) {
            return;
        }

        tryServerRequest(async () => {
            const bills = await API.Clients.Bills.Get(Number(clientID));

            setBills(bills);
        });
    }

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
            expireDate: "",
            ownerType: ""
        });

        setEditBillModal(true);
    }

    const saveNewBill = () => {
        tryServerRequest(async () => {
            const result = await API.Clients.Bills.Create(Number(clientID), editBill);

            const bill = { ...editBill, id: result.id };

            if (bills !== null) {
                setBills([...bills, bill])
            }

            setEditBill(bill);
        });
    }

    const openBill = (id: number) => {
        tryServerRequest(async () => {
            const bill = await API.Clients.Bills.GetByID(Number(clientID), id);

            if (newBill) {
                setNewBill(false);
            }

            setEditBill(bill);

            setEditBillModal(true);
        });
    }

    const deleteBill = () => {
        tryServerRequest(async () => {
            await API.Clients.Bills.Delete(Number(clientID), editBill.id);

            if (bills !== null) {
                setBills(bills.filter(bill => bill.id !== editBill.id));
            }

            setEditBillModal(false);
        });
    }

    const saveBill = () => {
        tryServerRequest(async () => {
            await API.Clients.Bills.Save(Number(clientID), editBill);

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

    return (
        <>
            <ItemPage
                deleteModalProps={{
                    isShow: deleteModalShow,
                    setIsShow: setDeleteModalShow,
                    title: `Удаление записи о ${client.name}`,
                    body: `Вы действительно хотите удалить запись о клиенте ${client.name}?`,
                    onDelete: deleteClient
                }}
                cancelModalProps={{
                    isShow: cancelEditModalShow,
                    setIsShow: setCancelEditModalShow,
                    title: "Отмена изменений",
                    body: "Вы точно хотите отменить редактирование? Измененные данные не сохранятся.",
                    onApprove: abortEdit
                }}
                itemPageBarProps={{
                    isEditMode: isEditMode,
                    backClickAction: () => navigate("/clients"),
                    cancelEditClickAction: () => setCancelEditModalShow(true),
                    saveClickAction: saveClient,
                    editClickAction: editClick,
                    deleteClickAction: () => setDeleteModalShow(true)
                }}
            >
                <Categories defaultActiveKey={["0"]} alwaysOpen>
                    <Categories.Item
                        name="Информация о клиенте"
                        eventKey="0"
                        notClosable
                    >
                        <Client
                            client={client}
                            setClient={setClient}
                            isEditMode={isEditMode}
                            newClient={newClient}
                        />
                    </Categories.Item>
                    <Categories.Item
                        name="Счета клиента"
                        eventKey="1"
                        onClick={openBills}
                    >
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
                    </Categories.Item>
                </Categories>
            </ItemPage>
            {
                editBillModal &&
                <BillModal
                    isShow={editBillModal}
                    setIsShow={setEditBillModal}
                    bill={editBill}
                    setBill={setEditBill}
                    newBill={newBill}
                    newBillSaveAction={saveNewBill}
                    billDeleteAction={deleteBill}
                    billSaveAction={saveBill}
                />
            }
        </>
    );
}

export default ClientPage;