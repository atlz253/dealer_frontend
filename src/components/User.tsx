import { DateTime } from "luxon";
import NamedInput from "./NamedInputs/NamedInput";
import NamedSelect from "./NamedInputs/NamedSelect";
import IDealer from "dealer_common/interfaces/IDealer";
import IAuthorization from "dealer_common/interfaces/IAuthorization";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import IUser from "dealer_common/interfaces/IUser";

interface IUserProps {
    user: IUser | IDealer,
    setUser: Dispatch<SetStateAction<IUser | IDealer>>,
    isEditMode?: boolean,
    isNewUser?: boolean
}

const User: FC<IUserProps> = ({ user, setUser, isEditMode, isNewUser }) => {
    const [employmentDate, setEmploymentDate] = useState<string>("");

    useEffect(() => {
        if (user.type !== "dealer") {
            return;
        }
        
        const dealer = user as IDealer;
        
        if (dealer.employmentDate !== undefined && dealer.employmentDate !== "") {
            return;
        }
        
        dealer.employmentDate = DateTime.now().toLocaleString();

        setEmploymentDate(dealer.employmentDate);
    }, [user]);

    return (
        <div>
            <NamedInput
                name="Имя пользователя"
                value={user.firstName}
                onChange={(value: string) => setUser({ ...user, firstName: value })}
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
                disabled={!isNewUser || !isEditMode}
                onChange={event => setUser({ ...user, type: event.target.value })}
                value={user.type}
            >
                <option value="dealer">Дилер</option>
                <option value="admin">Администратор</option>
            </NamedSelect>
            {
                user.type === "dealer" &&
                <NamedInput
                    name="Принят на работу"
                    value={employmentDate}
                    onChange={value => {
                        const date = DateTime.fromFormat(value, "d.M.yy");

                        if (date.isValid) {
                            let dealer = user as IDealer;

                            setUser({ ...dealer, employmentDate: String(date.toISODate()) });
                        }

                        setEmploymentDate(value);
                    }}
                    disabled={!isNewUser || !isEditMode}
                />
            }
        </div>
    );
}

export default User;