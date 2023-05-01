import { Modal } from "react-bootstrap";
import ProductsTable from "./ProductsTable";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";

interface IProductsModalProps {
    isShow: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>,
    onAddClick?: (product: IBaseProduct) => any,
    addedProducts?: IBaseProduct[],
    onRemoveClick?: (product: IBaseProduct) => any
}

const ProductsModal: FC<IProductsModalProps> = ({ isShow, setIsShow, onAddClick, addedProducts, onRemoveClick }) => {
    const [products, setProducts] = useState<IBaseProduct[]>([]);

    useEffect(() => {
        tryServerRequest(async () => {
            const products = await API.Products.Get();

            setProducts(products);
        });
    }, []);

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
                    onAddClick={onAddClick}
                    addedProducts={addedProducts}
                    onRemoveClick={onRemoveClick}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ProductsModal;