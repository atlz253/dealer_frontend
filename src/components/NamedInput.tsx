import React, { ChangeEvent, FC } from 'react';
import { Form } from 'react-bootstrap';

interface INamedInputProps {
    name: string,
    value: string,
    onChange: (value: string) => void
}

const NamedInput: FC<INamedInputProps> = ({ name, value, onChange }) => {
    return (
        <div className="d-flex align-items-center mt-1">
            <div style={{ width: "150px" }}>
                <b>{name}</b>
            </div>
            <Form.Control
                type="text"
                value={value}
                className="ms-1"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            />
        </div>
    );
}

export default NamedInput;