import { faArrowLeft, faBan, faFloppyDisk, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Bill from "./Bill";
import IconButton from "./IconButton";
import { FC } from "react";
import classNames from "classnames";

export interface IItemPageBar {
    isEditMode?: boolean,
    isNewItem?: boolean,
    backClickAction?: () => any,
    saveClickAction?: () => any,
    editClickAction?: () => any,
    deleteClickAction?: () => any,
    cancelEditClickAction?: () => any
}

const ItemPageBar: FC<IItemPageBar> = ({ backClickAction, isEditMode, isNewItem, saveClickAction, editClickAction, deleteClickAction, cancelEditClickAction }) => {
    return (
        <div className={classNames("d-flex", (backClickAction === undefined && !isEditMode || isNewItem) ? "justify-content-end" : "justify-content-between")}>
            {
                backClickAction !== undefined && !isEditMode &&
                <IconButton
                    icon={faArrowLeft}
                    variant="secondary"
                    text="Назад"
                    onClick={backClickAction}
                />
            }
            {
                isEditMode && !isNewItem &&
                <IconButton
                    icon={faBan}
                    variant="secondary"
                    text="Отменить"
                    onClick={cancelEditClickAction}
                />
            }
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