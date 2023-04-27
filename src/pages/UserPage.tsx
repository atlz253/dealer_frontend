import { faArrowLeft, faFloppyDisk, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FC, useState, useEffect, useRef } from "react";
import ApproveModal from "../components/ApproveModal";
import DeleteModal from "../components/DeleteModal";
import IconButton from "../components/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import IDealer from "audio_diler_common/interfaces/IDealer";
import User from "../components/User";
import IUser from "audio_diler_common/interfaces/IUser";

interface IUserProps {
    newUser?: boolean
}

const UserPage: FC<IUserProps> = ({ newUser }) => {
    const { userID } = useParams();
    const [user, setUser] = useState<IUser | IDealer>({
        id: 0,
        firstName: "",
        type: "dealer",
        login: "",
        password: ""
    });
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const userBackup = useRef<IUser | IDealer | null>(null);

    useEffect(() => {
        if (newUser) {
            setIsEditMode(true);

            return;
        }

        if (userID === undefined) {
            alert("Не удалось получить ID пользователя");

            return;
        }

        tryServerRequest(async () => {
            const user = await API.Users.GetByID(Number(userID));

            setUser(user);
        });
    }, []);

    const backClick = () => {
        if (isEditMode) {
            setCancelEditModalShow(true);
        }
        else {
            navigate("/users");
        }
    }

    const abortEdit = () => {
        if (newUser) {
            navigate("/users");

            return;
        }

        if (userBackup.current !== null) {
            setUser(userBackup.current);
        }
        else {
            console.error("Не удалось найти резервную копию данных пользователя");
        }

        setIsEditMode(false);
        setCancelEditModalShow(false);
    }

    const editUser = () => {
        userBackup.current = structuredClone(user);

        setIsEditMode(true);
    }

    const saveUser = () => {
        userBackup.current = null;

        tryServerRequest(async () => {
            if (newUser) {
                const response = await API.Users.Create(user);

                setUser({ ...user, id: response.id });
            }
            else {
                await API.Users.Save(user);
            }
        });

        setIsEditMode(false);
    }

    const deleteUser = () => {
        tryServerRequest(async () => {
            await API.Users.Delete(user.id);
        });

        navigate("/users");
    }

    return ( // FIXME: переписать с использванием компонента ItemPage
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
                                    onClick={saveUser}
                                />
                            </div>
                            :
                            <div>
                                <IconButton
                                    icon={faPen}
                                    variant="secondary"
                                    text="Изменить"
                                    onClick={editUser}
                                />
                                {
                                    user.id !== 1 && // аккаунт первого администратора удалить нельзя
                                    <IconButton
                                        icon={faTrash}
                                        variant="danger"
                                        text="Удалить"
                                        onClick={() => setDeleteModalShow(true)}
                                        className="ms-1"
                                    />
                                }
                            </div>
                    }

                </div>
                <h1 className="text-center">{user.firstName}</h1>
                <User
                    user={user}
                    setUser={setUser}
                    isEditMode={isEditMode}
                    isNewUser={newUser}
                />
            </div>
            {
                deleteModalShow &&
                <DeleteModal
                    isShow={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                    title="Удаление учётной записи"
                    body={`Вы действительно хотите удалить учётную запись пользователя ${user.firstName}?`}
                    onDelete={deleteUser}
                />
            }
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

export default UserPage;