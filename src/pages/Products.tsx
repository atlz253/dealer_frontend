import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { FC, useContext, useEffect, useState } from 'react';
import IconButton from "../components/IconButton";
import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import API from "../api/API";
import ProductsTable from "../components/ProductsTable";
import { useNavigate } from "react-router-dom";
import tryServerRequest from "../utils/tryServerRequest";

const Products: FC = () => {
    const [products, setProducts] = useState<IBaseProduct[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        tryServerRequest(async () => {
            const response: IBaseProduct[] = await API.Products.Get();

            setProducts(response);
        });
    }, []);

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                <IconButton
                    icon={faPlus}
                    text="Добавить"
                    className="ms-1"
                    onClick={() => navigate("/products/new")}
                />
            </div>
            <ProductsTable
                products={products}
                onRowClick={(id: number) => navigate(`/products/${id}`)}
                rowTitle="Нажмите, чтобы просмотреть товар"
            />
        </div>
    );
}

export default Products;