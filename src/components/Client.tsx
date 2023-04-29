import IClient from "audio_diler_common/interfaces/IClient";
import { Dispatch, FC, SetStateAction } from "react";
import NamedInput from "./NamedInputs/NamedInput";

interface IClientProps {
    client: IClient,
    setClient: Dispatch<SetStateAction<IClient>>,
    isEditMode?: boolean,
    newClient?: boolean
}

const Client: FC<IClientProps> = ({ client, setClient, isEditMode, newClient }) => {
    return (
        <div>
            <NamedInput
                name="Имя"
                value={client.name}
                onChange={value => setClient({ ...client, name: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="Телефон"
                value={client.phone}
                onChange={value => setClient({ ...client, phone: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="Почта"
                value={client.email}
                onChange={value => setClient({ ...client, email: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="Адрес"
                value={client.address}
                onChange={value => setClient({ ...client, address: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="День рождения"
                value={client.birthday}
                onChange={value => setClient({ ...client, birthday: value })}
                disabled={!isEditMode}
            />
            {
                !newClient &&
                <NamedInput
                    name="Добавлен"
                    value={client.added}
                    onChange={value => setClient({ ...client, added: value })}
                    disabled={true}
                />
            }
        </div>
    );
}

export default Client;