import IProduct from "audio_diler_common/interfaces/IProduct";
import React, { useContext, useEffect, useRef, useState, FC } from 'react';
import API from "../api/API";
import { useNavigate, useParams } from "react-router-dom";
import NamedInput, { NamedInputType } from "../components/NamedInput/NamedInput";
import { faArrowLeft, faFloppyDisk, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../components/IconButton";
import DeleteModal from "../components/DeleteModal";
import ApproveModal from "../components/ApproveModal";
import { AuthContext, IAuthContext } from "../context";

interface ProductProps {
    newProduct?: boolean
}

const Product: FC<ProductProps> = ({ newProduct }) => {
    const { productID } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const productBackup = useRef<IProduct | null>(null);
    const { auth } = useContext<IAuthContext>(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (newProduct) {
            setProduct({
                id: 0,
                name: "",
                category: "",
                quantity: 0,
                price: 0,
                description: "" 
            });

            setIsEditMode(true);

            return;
        }

        const fetch = async () => {
            if (productID === undefined) {
                console.error("Не удалось получить ID товара");

                return;
            }

            if (auth === null || auth.accessToken === undefined) {
                alert("Ошибка авторизации");

                return;
            }

            const response = await API.Products.GetProduct(auth.accessToken, productID);

            if (response === null || response.status !== 200 || response.data === undefined) {
                console.log(response);


                alert("Не удалось получить данные");

                return;
            }

            setProduct(response.data);
        }

        fetch();
    }, []);

    const deleteProduct = () => {

        navigate("/products");
    }

    const saveProduct = async () => {
        productBackup.current = null;

        if (auth === null || auth.accessToken === undefined) {
            alert("Ошибка авторизации");

            return;
        }

        if (product === null) {
            console.error("Отсутствует объект товара");
            
            return;
        }

        let p;

        if (newProduct) {
            p = await API.Products.CreateProduct(auth.accessToken, product);

            if (p === null || p.status !== 200 || p.data === undefined) {
                alert("Не удалось создать товар");
                
                return;
            }
    
            setProduct(p.data);
        }
        else {
            p = await API.Products.SaveProduct(auth.accessToken, product);

            if (p === null || p.status !== 200) { // TODO: разобраться со статус кодами
                alert("Не удалось создать товар");
                
                return;
            }
        }

        setIsEditMode(false);
    }

    const editProduct = () => {
        productBackup.current = JSON.parse(JSON.stringify(product));

        setIsEditMode(true);
    }

    const abortEdit = () => {
        if (newProduct) {
            navigate("/products");

            return;
        }

        const product = productBackup.current;

        productBackup.current = null;

        setProduct(product);

        setIsEditMode(false);
        setCancelEditModalShow(false);
    }

    const backClick = () => {
        if (isEditMode) {
            setCancelEditModalShow(true);
        }
        else {
            navigate("/products");
        }
    }

    if (product === null) {
        return (
            <h1>
                Грузим данные (скорее всего)
            </h1>
        )
    }

    return (
        <>
            <div className="d-flex flex-fill flex-column p-1">
                <div className="d-flex justify-content-between">
                    <IconButton
                        icon={faArrowLeft}
                        variant="secondary"
                        text="Назад"
                        onClick={backClick}
                    />
                    {
                        isEditMode ?
                            <div>
                                <IconButton
                                    icon={faFloppyDisk}
                                    variant="success"
                                    text="Сохранить"
                                    onClick={saveProduct}
                                />
                            </div>
                            :
                            <div>
                                <IconButton
                                    icon={faPen}
                                    variant="secondary"
                                    text="Изменить"
                                    onClick={editProduct}
                                />
                                <IconButton
                                    icon={faTrash}
                                    variant="danger"
                                    text="Удалить"
                                    onClick={() => setDeleteModalShow(true)}
                                    className="ms-1"
                                />
                            </div>
                    }

                </div>
                <h1 className="text-center">{product.name}</h1>
                <NamedInput
                    name="Наименование"
                    value={product.name}
                    onChange={(value: string) => setProduct({ ...product, name: value })}
                    disabled={!isEditMode}
                />
                <NamedInput
                    name="Категория"
                    value={product.category}
                    onChange={(value: string) => setProduct({ ...product, category: value })}
                    disabled={!isEditMode}
                />
                <NamedInput
                    name="Цена"
                    value={String(product.price)}
                    onChange={(value: string) => setProduct({ ...product, price: Number(value) })}
                    disabled={!isEditMode}
                />
                <NamedInput
                    name="Количество"
                    value={String(product.quantity)}
                    onChange={(value: string) => setProduct({ ...product, quantity: Number(value) })}
                    disabled={!isEditMode}
                />
                <NamedInput
                    name="Описание"
                    value={product.description}
                    onChange={(value: string) => setProduct({ ...product, description: value })}
                    disabled={!isEditMode}
                    type={NamedInputType.textarea}
                    rows={10}
                />
            </div>
            <DeleteModal
                isShow={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                title="Удаление товара"
                body={`Вы действительно хотите удалить ${product.name}?`}
                onDelete={deleteProduct}
            />
            {
                isEditMode &&
                <ApproveModal
                    isShow={cancelEditModalShow}
                    onHide={() => setCancelEditModalShow(false)}
                    title="Отмена изменений"
                    body="Вы точно хотите отменить редактирование? Измененные данные не сохранятся."
                    onApprove={abortEdit}
                />
            }
        </>
    );
}

export default Product;