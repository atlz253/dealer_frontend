import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import IconButton from "./IconButton";
import { faBan, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

interface IApproveModalProps {
    isShow: boolean,
    onHide: () => any,
    onApprove?: () => any | undefined,
    title: string,
    body: string
}

const ApproveModal: FC<IApproveModalProps> = ({ isShow, onHide, title, body, onApprove = undefined }) => {
    return (
        <Modal show={isShow} onHide={onHide}>
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
                    onClick={onHide}
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