import IBill from 'dealer_common/interfaces/IBill';
import { FC } from 'react';
import NamedInput from './NamedInputs/NamedInput';
import NamedSelect from "./NamedInputs/NamedSelect";

interface IBillProps {
    bill: IBill,
    setBill: (value: IBill) => void,
    className?: string,
    isEditMode?: boolean,
    newBill?: boolean
}

const Bill: FC<IBillProps> = ({ bill, setBill, className = "", isEditMode = false, newBill }) => {
    return (
        <div className={className}>
            {
                !newBill &&
                <NamedInput
                    name="Владелец"
                    value={bill.ownerName}
                    disabled={true}
                />
            }
            <NamedInput
                name="Номер счета"
                value={bill.billNumber}
                onChange={(value: string) => setBill({ ...bill, billNumber: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="Банк"
                value={bill.bankName}
                onChange={(value: string) => setBill({ ...bill, bankName: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="Корр. счет"
                value={bill.correspondentBill}
                onChange={(value: string) => setBill({ ...bill, correspondentBill: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="БИК"
                value={bill.BIC}
                onChange={(value: string) => setBill({ ...bill, BIC: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="ИНН"
                value={bill.INN}
                onChange={(value: string) => setBill({ ...bill, INN: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="Действителен до"
                value={bill.expireDate}
                onChange={(value: string) => setBill({ ...bill, expireDate: value })}
                disabled={!isEditMode}
            />
        </div>
    );
}

export default Bill;