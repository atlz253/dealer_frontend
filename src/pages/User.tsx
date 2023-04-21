import { faArrowLeft, faFloppyDisk, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FC, useState, useEffect, useRef } from "react";
import ApproveModal from "../components/ApproveModal";
import DeleteModal from "../components/DeleteModal";
import IconButton from "../components/IconButton";
import NamedInput, { NamedInputType } from "../components/NamedInputs/NamedInput";
import IUser from "audio_diler_common/interfaces/IUser";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import NamedSelect from "../components/NamedInputs/NamedSelect";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import { DateTime } from "luxon";

interface IUserProps {
    newUser?: boolean
}

const User: FC<IUserProps> = ({ newUser }) => {
    const { userID } = useParams();
    const [user, setUser] = useState<IUser>({
        id: 0,
        name: "",
        birthday: String(DateTime.now().toISODate()),
        login: "",
        password: "",
        type: "dealer",
        employmentDate: String(DateTime.now().toISODate())
    });
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const [birthday, setBirthday] = useState<string>("");
    const [employmentDate, setEmploymentDate] = useState<string>("");
    const userBackup = useRef<IUser | null>(null);

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

    useEffect(() => {
        setBirthday(user.birthday === null ? "" : DateTime.fromISO(user.birthday).toLocaleString());
        setEmploymentDate(DateTime.fromISO(user.employmentDate).toLocaleString());
    }, [user]);

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
                <h1 className="text-center">{user.name}</h1>
                <NamedInput
                    name="Имя пользователя"
                    value={user.name}
                    onChange={(value: string) => setUser({ ...user, name: value })}
                    disabled={!isEditMode}
                />
                <NamedInput
                    name="Логин"
                    value={user.login}
                    onChange={(value: string) => setUser({ ...user, login: value })}
                    disabled={!isEditMode}
                />
                <NamedInput
                    name="Пароль"
                    value={user.password}
                    onChange={(value: string) => setUser({ ...user, password: value })}
                    disabled={!isEditMode}
                />
                <NamedSelect
                    name="Тип пользователя"
                    disabled={!isEditMode}
                    onChange={e => setUser({ ...user, type: e.target.value })}
                    value={user.type}
                >
                    <option value="dealer">Дилер</option>
                    <option value="admin">Администратор</option>
                </NamedSelect>
                <NamedInput
                    name="Принят на работу"
                    value={employmentDate}
                    onChange={value => {
                        const date = DateTime.fromFormat(value, "d.M.yy");

                        if (date.isValid) {
                            user.employmentDate = String(date.toISODate());
                        }

                        setEmploymentDate(value);
                    }}
                    disabled={!isEditMode}
                />
                <NamedInput
                    name="День рождения"
                    value={birthday}
                    onChange={value => {
                        const date = DateTime.fromFormat(value, "d.M.yy");

                        if (date.isValid) {
                            user.birthday = String(date.toISODate());
                        }

                        setBirthday(value);
                    }}
                    disabled={!isEditMode}
                />
            </div>
            {
                deleteModalShow &&
                <DeleteModal
                    isShow={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                    title="Удаление учётной записи"
                    body={`Вы действительно хотите удалить учётную запись пользователя ${user.name}?`}
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

export default User;