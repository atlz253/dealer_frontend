import { Form } from "react-bootstrap";
import styles from "./NamedInputs.module.css";
import classNames from "classnames";
import { ChangeEventHandler, FC, ReactNode } from "react";

interface INamedSelectProps {
    name: string,
    children?: ReactNode,
    disabled?: boolean,
    onChange?: ChangeEventHandler<HTMLSelectElement>
    value?: string
}

const NamedSelect: FC<INamedSelectProps> = ({ name, children, disabled, onChange, value }) => {
    return (
        <div className="d-flex align-items-start mt-1">
            <div className={classNames(styles.name, "mt-1")}>
                <b>{name}</b>
            </div>
            <Form.Select
                className="ms-1"
                disabled={disabled}
                onChange={onChange}
                value={value}
            >
                {children}
            </Form.Select>
        </div>
    );
}

export default NamedSelect;