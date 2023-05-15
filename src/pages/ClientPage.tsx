import { FC, useEffect, useState, useRef } from "react";
import ItemPage from "../components/ItemPage";
import IClient from "dealer_common/interfaces/IClient";
import { useNavigate, useParams } from "react-router-dom";
import Client from "../components/Client";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import Categories from "../components/Categories/Categories";
import IBaseBill from "dealer_common/interfaces/IBaseBill";
import IBill from "dealer_common/interfaces/IBill";
import Bills from "../components/Bills";

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
                
                navigate("/clients/" + result.id);

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

            setBills(bills as IBaseBill[]);
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
                        <Bills 
                            bills={bills}
                            setBills={setBills}
                            getBill={(id: number) => API.Clients.Bills.GetByID(Number(clientID), id)}
                            saveBill={(bill: IBill) => API.Clients.Bills.Save(Number(clientID), bill)}
                            createBill={(bill: IBill) => API.Clients.Bills.Create(Number(clientID), bill)}
                            deleteBill={(id: number) => API.Clients.Bills.Delete(Number(clientID), id)}
                        />
                    </Categories.Item>
                </Categories>
            </ItemPage>
        </>
    );
}

export default ClientPage;