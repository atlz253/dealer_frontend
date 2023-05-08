import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, FC, SetStateAction, useState } from "react";
import IconButton from "./IconButton";
import ProductsModal from "./ProductsModal";
import ProductsTable, { ProductsIndexing } from "./ProductsTable";
import IBaseProduct from "dealer_common/interfaces/IBaseProduct";
import IProduct from "dealer_common/interfaces/IProduct";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import ProductModal from "./ProductModal";
import ID from "dealer_common/interfaces/ID";

interface IProductsProps {
    products: IBaseProduct[] | null,
    removeProduct?: (product: IBaseProduct) => void,
    addProduct?: (product: IBaseProduct) => void,
    productsModalProps?: {
        products: IBaseProduct[],
        setProducts?: Dispatch<SetStateAction<IBaseProduct[]>>,
        isEditMode?: boolean
    },
    productModalProps?: {
        getProduct: (id: number) => Promise<IProduct>,
        createProduct?: (product: IProduct) => Promise<ID>,
        saveProduct?: (product: IProduct) => Promise<void>,
        deleteProduct?: (id: number) => Promise<void>
    }
}

const Products: FC<IProductsProps> = ({ products, removeProduct, addProduct, productsModalProps, productModalProps }) => {
    const [productsModalShow, setProductsModalShow] = useState<boolean>(false);
    const [productModalShow, setProductModalShow] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct>({
        id: 0,
        name: "",
        category: "",
        manufacturer: "",
        quantity: 0,
        price: 0,
        description: ""
    });
    const [newProduct, setNewProduct] = useState<boolean>(false);

    const openProduct = (id: number) => {
        if (productModalProps === undefined) {
            return;
        }

        if (newProduct) {
            setNewProduct(false);
        }

        tryServerRequest(async () => {
            const product = await productModalProps.getProduct(id);

            setProduct(product);
            setProductModalShow(true);
        });
    }

    const openNewProduct = () => {
        setProduct({
            id: 0,
            name: "",
            category: "",
            manufacturer: "",
            quantity: 0,
            price: 0,
            description: ""
        });

        setNewProduct(true);
        setProductModalShow(true);
    }

    if (products === null) {
        return <></>
    }

    return (
        <>
            <div className="d-flex flex-fill flex-column p-1">
                <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                    {
                        productsModalProps &&
                        <IconButton
                            icon={faPlus}
                            text="Добавить товар"
                            className="ms-1"
                            onClick={() => setProductsModalShow(true)}
                        />
                    }
                    {
                        productModalProps &&
                        <IconButton
                            icon={faPlus}
                            text="Создать товар"
                            className="ms-1"
                            onClick={openNewProduct}
                        />
                    }
                </div>

                <ProductsTable
                    products={products}
                    indexing={ProductsIndexing.number}
                    addedProducts={products}
                    onRemoveClick={productsModalProps?.isEditMode ? removeProduct : undefined}
                    onRowClick={productModalProps ? openProduct : undefined}
                />
            </div>
            {
                productsModalShow &&
                <ProductsModal
                    isShow={productsModalShow}
                    setIsShow={setProductsModalShow}
                    products={productsModalProps ? productsModalProps.products : []}
                    setProducts={productsModalProps?.setProducts}
                    onAddClick={addProduct}
                    addedProducts={products}
                    onRemoveClick={removeProduct}
                    isQuantityChangeable={true}
                />
            }
            {
                productModalShow &&
                <ProductModal
                    isShow={productModalShow}
                    setIsShow={setProductModalShow}
                    product={product}
                    setProduct={setProduct}
                    newProduct={newProduct}
                    setNewProduct={setNewProduct}
                    createProduct={productModalProps?.createProduct}
                    saveProduct={productModalProps?.saveProduct}
                    deleteProduct={productModalProps?.deleteProduct}
                />
            }
        </>
    );
}

export default Products;