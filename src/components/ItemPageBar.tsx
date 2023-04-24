import { faArrowLeft, faFloppyDisk, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Bill from "./Bill";
import IconButton from "./IconButton";
import { FC } from "react";

export interface IItemPageBar {
    isEditMode?: boolean,
    backClickAction?: () => any,
    saveClickAction?: () => any,
    editClickAction?: () => any,
    deleteClickAction?: () => any
}

const ItemPageBar: FC<IItemPageBar> = ({ backClickAction, isEditMode, saveClickAction, editClickAction, deleteClickAction }) => {
    return (
        <div className="d-flex justify-content-between">
            <IconButton
                icon={faArrowLeft}
                variant="secondary"
                text="Назад"
                onClick={backClickAction}
            />
            {
                isEditMode ?
                    <div>
                        <IconButton
                            icon={faFloppyDisk}
                            variant="success"
                            text="Сохранить"
                            onClick={saveClickAction}
                        />
                    </div>
                    :
                    <div>
                        <IconButton
                            icon={faPen}
                            variant="secondary"
                            text="Изменить"
                            onClick={editClickAction}
                        />
                        <IconButton
                            icon={faTrash}
                            variant="danger"
                            text="Удалить"
                            onClick={deleteClickAction}
                            className="ms-1"
                        />
                    </div>
            }
        </div>
    );
}

export default ItemPageBar;