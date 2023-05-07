import { Modal } from "react-bootstrap";
import ProductsTable from "./ProductsTable";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";

interface IProductsModalProps {
    isShow: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>,
    products: IBaseProduct[],
    setProducts?: Dispatch<SetStateAction<IBaseProduct[]>>,
    onAddClick?: (product: IBaseProduct) => any,
    addedProducts?: IBaseProduct[],
    onRemoveClick?: (product: IBaseProduct) => any,
    isQuantityChangeable?: boolean
}

const ProductsModal: FC<IProductsModalProps> = ({ isShow, setIsShow, products, setProducts, onAddClick, addedProducts, onRemoveClick, isQuantityChangeable }) => {
    return (
        <Modal size="lg" show={isShow} onHide={() => setIsShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Товары
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProductsTable
                    products={products}
                    setProducts={setProducts}
                    onAddClick={onAddClick}
                    addedProducts={addedProducts}
                    onRemoveClick={onRemoveClick}
                    isQuantityChangeable={isQuantityChangeable}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ProductsModal;