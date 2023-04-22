import React, { ChangeEvent, FC } from 'react';
import { Form } from 'react-bootstrap';
import styles from './NamedInputs.module.css';
import classNames from "classnames";

export enum NamedInputType {
    text,
    textarea
}

interface INamedInputProps {
    name: string,
    value: string,
    disabled?: boolean,
    onChange?: (value: string) => void,
    type?: NamedInputType,
    rows?: number
}

const NamedInput: FC<INamedInputProps> = ({ name, value, onChange, rows, disabled = false, type = NamedInputType.text }) => {
    return (
        <div className="d-flex align-items-start mt-1">
            <div className={classNames(styles.name, "mt-1")}>
                <b>{name}</b>
            </div>
            <Form.Control
                type={type === NamedInputType.text ? "text" : undefined}
                as={type === NamedInputType.text ? undefined : "textarea"}
                value={value}
                className={classNames(styles.input, "ms-1")}
                onChange={(onChange === undefined) ? undefined : (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                disabled={disabled}
                rows={rows}
            />
        </div>
    );
}

export default NamedInput;