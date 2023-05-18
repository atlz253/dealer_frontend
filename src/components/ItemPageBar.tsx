import { faArrowLeft, faBan, faFloppyDisk, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Bill from "./Bill";
import IconButton from "./IconButton";
import { FC } from "react";
import classNames from "classnames";

export interface IItemPageBar {
    isEditMode?: boolean,
    backClickAction?: () => any,
    saveClickAction?: () => any,
    editClickAction?: () => any,
    deleteClickAction?: () => any,
    cancelEditClickAction?: () => any
}

// TODO: доделать условия появления кнопки назад и отмена
const ItemPageBar: FC<IItemPageBar> = ({ backClickAction, isEditMode, saveClickAction, editClickAction, deleteClickAction, cancelEditClickAction }) => {
    return (
        <div className={classNames("d-flex", (backClickAction === undefined && !isEditMode) ? "justify-content-end" : "justify-content-between")}>
            {
                backClickAction !== undefined && (!isEditMode) &&
                <IconButton
                    icon={faArrowLeft}
                    variant="primary"
                    text="Назад"
                    onClick={backClickAction}
                />
            }
            {
                isEditMode &&
                <IconButton
                    icon={faBan}
                    variant="primary"
                    text="Отмена"
                    onClick={cancelEditClickAction}
                />
            }
            {
                isEditMode ?
                    <div>
                        <IconButton
                            icon={faFloppyDisk}
                            variant="primary"
                            text="Сохранить"
                            onClick={saveClickAction}
                        />
                    </div>
                    :
                    <div>
                        <IconButton
                            icon={faPen}
                            variant="primary"
                            text="Изменить"
                            onClick={editClickAction}
                        />
                        <IconButton
                            icon={faTrash}
                            variant="primary"
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