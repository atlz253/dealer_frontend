import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { FC, useEffect, useState } from 'react';
import IconButton from "../components/IconButton";
import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import API from "../api/API";
import ProductsTable from "../components/ProductsTable";
import { diler_router } from "../routers";

const Products: FC = () => {
    const [products, setProducts] = useState<IBaseProduct[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const products: IBaseProduct[] = await API.Products.Get();

            setProducts(products);
        }

        fetch();
    }, []);

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                <IconButton 
                    icon={faPlus}
                    text="Добавить"
                    className="ms-1"
                />
            </div>
            <ProductsTable 
                products={products}
                onRowClick={(id: number) => diler_router.navigate(`/products/${id}`)}
                rowTitle="Нажмите, чтобы просмотреть товар"
            />
        </div>
    );
}

export default Products;