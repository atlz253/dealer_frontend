import { FC, ReactNode } from "react";
import DeleteModal, { IDeleteModalProps } from "./DeleteModal";
import ApproveModal, { IApproveModalProps } from "./ApproveModal";

interface IItemPageProps {
    deleteModalProps: IDeleteModalProps,
    cancelModalProps: IApproveModalProps,
    children?: ReactNode
}

const ItemPage: FC<IItemPageProps> = ({ deleteModalProps, cancelModalProps, children }) => {
    return (
        <>
            <div className="d-flex flex-fill flex-column p-1">
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