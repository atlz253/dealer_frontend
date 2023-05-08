import IProvider from "dealer_common/interfaces/IProvider";
import { Dispatch, FC, SetStateAction } from "react";
import NamedInput from "./NamedInputs/NamedInput";

interface IProviderProps {
    provider: IProvider,
    setProvider: Dispatch<SetStateAction<IProvider>>,
    isEditMode?: boolean
}

const Provider: FC<IProviderProps> = ({ provider, setProvider, isEditMode }) => {
    return (
        <div>
            <NamedInput 
                name="Имя"
                disabled={!isEditMode}
                value={provider.name}
                onChange={value => setProvider({...provider, name: value})}
            />
            <NamedInput 
                name="Телефон"
                disabled={!isEditMode}
                value={provider.phone}
                onChange={value => setProvider({...provider, phone: value})}
            />
            <NamedInput 
                name="Адрес"
                disabled={!isEditMode}
                value={provider.address}
                onChange={value => setProvider({...provider, address: value})}
            />
        </div>
    );
}

export default Provider;