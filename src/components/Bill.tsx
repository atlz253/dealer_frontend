import IBill from 'audio_diler_common/interfaces/IBill';
import React, { FC } from 'react';
import NamedInput from './NamedInput';

interface IBillProps {
    bill: IBill,
    setBill: (value: IBill) => void,
    className?: string
}

const Bill: FC<IBillProps> = ({ bill, setBill, className = "" }) => {
    return (
        <div className={className}>
            <NamedInput 
                name="Владелец"
                value={bill.ownerName}
                onChange={(value: string) => setBill({...bill, ownerName: value})}
            />
            <NamedInput 
                name="Расчетный счет"
                value={bill.billNumber}
                onChange={(value: string) => setBill({...bill, billNumber: value})}
            />
            <NamedInput 
                name="Банк"
                value={bill.bankName}
                onChange={(value: string) => setBill({...bill, bankName: value})}
            />
            <NamedInput 
                name="Корр. счет"
                value={bill.correspondentBill}
                onChange={(value: string) => setBill({...bill, correspondentBill: value})}
            />
            <NamedInput 
                name="БИК"
                value={bill.BIC}
                onChange={(value: string) => setBill({...bill, BIC: value})}
            />
            <NamedInput 
                name="ИНН"
                value={bill.INN}
                onChange={(value: string) => setBill({...bill, INN: value})}
            />
        </div>
    );
}

export default Bill;