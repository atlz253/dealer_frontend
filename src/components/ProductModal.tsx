import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Product from "./Product";
import IProduct from "audio_diler_common/interfaces/IProduct";
import ApproveModal from "./ApproveModal";
import DeleteModal from "./DeleteModal";
import ItemPageBar from "./ItemPageBar";
import tryServerRequest from "../utils/tryServerRequest";
import ID from "audio_diler_common/interfaces/ID";

interface IProductModalProps {
    isShow: boolean,
    setIsShow: Dispatch<SetStateAction<boolean>>,
    product: IProduct,
    setProduct: Dispatch<SetStateAction<IProduct>>,
    newProduct?: boolean,
    setNewProduct?: Dispatch<SetStateAction<boolean>>,
    createProduct?: (product: IProduct) => Promise<ID>,
    saveProduct?: (product: IProduct) => Promise<void>,
    deleteProduct?: (id: number) => Promise<void>
}

const ProductModal: FC<IProductModalProps> = ({ isShow, setIsShow, product, setProduct, newProduct, setNewProduct, createProduct, saveProduct, deleteProduct }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const productBackup = useRef<IProduct | null>(null);

    useEffect(() => {
        if (newProduct) {
            setIsEditMode(true);

            return;
        }
    }, []);

    const startEdit = () => {
        productBackup.current = structuredClone(product);

        setIsEditMode(true);
    }

    const abortEdit = () => {
        if (newProduct) {
            setIsShow(false);

            return;
        }

        if (productBackup.current !== null) {
            setProduct(productBackup.current);
        }

        setIsEditMode(false);
        setCancelEditModalShow(false);
    }

    const deleteProductAction = () => {
        if (deleteProduct === undefined) {
            return;
        }

        tryServerRequest(async () => {
            await deleteProduct(product.id);

            setIsShow(false);
            setDeleteModalShow(false);
        });

    }

    const saveProductAction = () => {
        tryServerRequest(async () => {
            if (newProduct) {
                if (createProduct === undefined) {
                    return;
                }
                
                const response = await createProduct(product);

                if (setNewProduct !== undefined) {
                    setNewProduct(false);
                }

                setProduct({...product, id: response.id});
            }
            else {
                if (saveProduct === undefined) {
                    return;
                }

                await saveProduct(product);
            }

            setIsEditMode(false);
        });
    }

    return (
        <>
            <Modal size="lg" show={isShow} onHide={() => setIsShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение товара</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Product
                        isEditMode={isEditMode}
                        product={product}
                        setProduct={setProduct}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex flex-fill flex-column">
                        <ItemPageBar
                            isEditMode={isEditMode}
                            editClickAction={startEdit}
                            saveClickAction={saveProductAction}
                            deleteClickAction={() => setDeleteModalShow(true)}
                            cancelEditClickAction={() => setCancelEditModalShow(true)}
                        />
                    </div>
                </Modal.Footer>
            </Modal>
            {
                deleteModalShow &&
                <DeleteModal
                    isShow={deleteModalShow}
                    setIsShow={setDeleteModalShow}
                    title={`Удаление ${product.name}`}
                    body={`Вы точно хотите удалить ${product.name}?`}
                    onDelete={deleteProductAction}
                />
            }
            {
                cancelEditModalShow &&
                <ApproveModal
                    isShow={cancelEditModalShow}
                    setIsShow={setCancelEditModalShow}
                    title="Отмена изменений"
                    body="Вы точно хотите отменить редактирование? Измененные данные не сохранятся."
                    onApprove={abortEdit}
                />
            }
        </>
    );
}

export default ProductModal;