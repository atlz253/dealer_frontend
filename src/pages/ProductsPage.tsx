import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { FC, useContext, useEffect, useState } from 'react';
import IconButton from "../components/IconButton";
import IBaseProduct from "dealer_common/interfaces/IBaseProduct";
import API from "../api/API";
import ProductsTable from "../components/ProductsTable";
import { useNavigate } from "react-router-dom";
import tryServerRequest from "../utils/tryServerRequest";
import Products from "../components/Products";
import IProduct from "dealer_common/interfaces/IProduct";
import ID from "dealer_common/interfaces/ID";

const ProductsPage: FC = () => {
    const [products, setProducts] = useState<IBaseProduct[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const response: IBaseProduct[] = await API.Products.Get();

            setProducts(response);
        });
    }, []);

    const createProduct = async (product: IProduct): Promise<ID> => {
        const response = await API.Products.Create(product);
        
        setProducts([...products, product]);

        return response;
    };

    const deleteProduct = async (id: number): Promise<void> => {
        await API.Products.Delete(id);

        const newProducts = products.filter(product => product.id !== id);

        setProducts(newProducts);
    }

    const saveProduct = async (product: IProduct): Promise<void> => {
        await API.Products.Save(product);

        const newProducts = products.map(p => {
            if (p.id === product.id) {
                return product;
            }

            return p;
        });

        setProducts(newProducts);
    }

    return (
        <Products
            products={products}
            productModalProps={{
                getProduct: (id: number) => API.Products.GetByID(id),
                createProduct: createProduct,
                saveProduct: saveProduct,
                deleteProduct: deleteProduct
            }}
        />
        // <>

        //     <div className="d-flex flex-fill flex-column p-1">
        //         <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
        //             <IconButton
        //                 icon={faPlus}
        //                 text="Добавить"
        //                 className="ms-1"
        //                 onClick={() => navigate("/products/new")}
        //             />
        //         </div>
        //         <ProductsTable
        //             products={products}
        //             onRowClick={(id: number) => navigate(`/products/${id}`)}
        //             rowTitle="Нажмите, чтобы просмотреть товар"
        //         />
        //     </div>
        // </>
    );
}

export default ProductsPage;