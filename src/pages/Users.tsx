import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../components/IconButton";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import IUser from "audio_diler_common/interfaces/IUser";

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const users = await API.Users.Get();

            console.log(users);

            setUsers(users);
        });
    }, []);

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                <IconButton
                    icon={faPlus}
                    text="Добавить"
                    className="ms-1"
                    onClick={() => navigate("/users/new")}
                />
            </div>
            <Table hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Логин</th>
                        <th>Тип</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) =>
                        <tr
                            key={user.id}
                            onClick={() => navigate(`/users/${user.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.login}</td>
                            <td>{user.type}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Users;