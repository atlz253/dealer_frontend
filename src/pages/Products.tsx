import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { FC, useContext, useEffect, useState } from 'react';
import IconButton from "../components/IconButton";
import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import API from "../api/API";
import ProductsTable from "../components/ProductsTable";
import { AuthContext, IAuthContext } from "../context";
import { useNavigate } from "react-router-dom";

const Products: FC = () => {
    const [products, setProducts] = useState<IBaseProduct[]>([]);
    const { auth } = useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            if (auth === null || auth.accessToken === undefined) {
                alert("Ошибка авторизации");

                return;
            }

            const response = await API.Products.Get(auth.accessToken);

            if (response === null || response.status !== 200 || response.data === undefined) {
                alert("Не удалось получить данные");

                return;
            }

            setProducts(response.data);
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