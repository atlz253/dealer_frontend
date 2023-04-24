import { FC, ReactNode } from "react";
import DeleteModal, { IDeleteModalProps } from "./DeleteModal";
import ApproveModal, { IApproveModalProps } from "./ApproveModal";
import ItemPageBar, { IItemPageBar } from "./ItemPageBar";

interface IItemPageProps {
    deleteModalProps: IDeleteModalProps,
    cancelModalProps: IApproveModalProps,
    itemPageBarProps?: IItemPageBar,
    children?: ReactNode
}

const ItemPage: FC<IItemPageProps> = ({ deleteModalProps, cancelModalProps, itemPageBarProps, children }) => {
    return (
        <>
            <div className="d-flex flex-fill flex-column p-1">
                <ItemPageBar {...itemPageBarProps} />
                {children}
            </div>
            {
                deleteModalProps.isShow &&
                <DeleteModal {...deleteModalProps} />
            }
            {
                cancelModalProps.isShow &&
                <ApproveModal {...cancelModalProps} />
            }
        </>
    );
}

export default ItemPage;