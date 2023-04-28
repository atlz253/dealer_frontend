import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, Modal } from 'react-bootstrap';
import IconButton from "./IconButton";
import { faBan, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface IDeleteModalProps {
    isShow: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>,
    onDelete?: () => any | undefined,
    title: string,
    body: string
}

const DeleteModal: FC<IDeleteModalProps> = ({ isShow, setIsShow, title, body, onDelete = undefined }) => {
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
                    icon={faTrash}
                    variant="danger"
                    text="Удалить"
                    onClick={onDelete}
                />
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;