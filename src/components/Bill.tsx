import IBill from 'audio_diler_common/interfaces/IBill';
import React, { FC } from 'react';
import NamedInput from './NamedInput/NamedInput';

interface IBillProps {
    bill: IBill,
    setBill: (value: IBill) => void,
    className?: string,
    isEditMode?: boolean
}

const Bill: FC<IBillProps> = ({ bill, setBill, className = "", isEditMode = false }) => {
    return (
        <div className={className}>
            <NamedInput 
                name="Владелец"
                value={bill.ownerName}
                onChange={(value: string) => setBill({...bill, ownerName: value})}
                disabled={isEditMode}
            />
            <NamedInput 
                name="Расчетный счет"
                value={bill.billNumber}
                onChange={(value: string) => setBill({...bill, billNumber: value})}
                disabled={isEditMode}
            />
            <NamedInput 
                name="Банк"
                value={bill.bankName}
                onChange={(value: string) => setBill({...bill, bankName: value})}
                disabled={isEditMode}
            />
            <NamedInput 
                name="Корр. счет"
                value={bill.correspondentBill}
                onChange={(value: string) => setBill({...bill, correspondentBill: value})}
                disabled={isEditMode}
            />
            <NamedInput 
                name="БИК"
                value={bill.BIC}
                onChange={(value: string) => setBill({...bill, BIC: value})}
                disabled={isEditMode}
            />
            <NamedInput 
                name="ИНН"
                value={bill.INN}
                onChange={(value: string) => setBill({...bill, INN: value})}
                disabled={isEditMode}
            />
        </div>
    );
}

export default Bill;