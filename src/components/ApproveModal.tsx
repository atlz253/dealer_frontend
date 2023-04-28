import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, Modal } from 'react-bootstrap';
import IconButton from "./IconButton";
import { faBan, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface IApproveModalProps {
    isShow: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>,
    onApprove?: () => any | undefined,
    title: string,
    body: string
}

const ApproveModal: FC<IApproveModalProps> = ({ isShow, setIsShow, title, body, onApprove = undefined }) => {
    return (
        <Modal show={isShow} onHide={() => setIsShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {body}
            </Modal.Body>

            <Modal.Footer>
                <IconButton
                    icon={faBan}
                    variant="secondary"
                    text="Отмена"
                    onClick={() => setIsShow(false)}
                />
                <IconButton
                    icon={faCheck}
                    variant="success"
                    text="Подтвердить"
                    onClick={onApprove}
                />
            </Modal.Footer>
        </Modal>
    );
}

export default ApproveModal;