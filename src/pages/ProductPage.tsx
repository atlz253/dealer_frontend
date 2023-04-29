import IProduct from "audio_diler_common/interfaces/IProduct";
import { useEffect, useRef, useState, FC } from 'react';
import API from "../api/API";
import { useNavigate, useParams } from "react-router-dom";
import { faArrowLeft, faFloppyDisk, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../components/IconButton";
import DeleteModal from "../components/DeleteModal";
import ApproveModal from "../components/ApproveModal";
import tryServerRequest from "../utils/tryServerRequest";
import Product from "../components/Product";
import ItemPage from "../components/ItemPage";

interface ProductPageProps {
    newProduct?: boolean
}

const ProductPage: FC<ProductPageProps> = ({ newProduct }) => {
    const { productID } = useParams();
    const [product, setProduct] = useState<IProduct>({
        id: 0,
        name: "",
        category: "",
        manufacturer: "",
        quantity: 0,
        price: 0,
        description: ""
    });
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const productBackup = useRef<IProduct | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (newProduct) {
            setIsEditMode(true);

            return;
        }

        if (productID === undefined) {
            console.error("Не удалось получить ID товара");

            return;
        }

        tryServerRequest(async () => {
            const product = await API.Products.GetProduct(productID);

            setProduct(product);
        });
    }, []);

    const deleteProduct = async () => {
        tryServerRequest(async () => {
            await API.Products.DeleteProduct(product.id)

            navigate("/products");
        });
    }

    const saveProduct = async () => {
        productBackup.current = null;

        tryServerRequest(async () => {
            if (newProduct) {
                const response = await API.Products.CreateProduct(product);

                setProduct({ ...product, id: response.id });
            }
            else {
                await API.Products.SaveProduct(product);
            }

            setIsEditMode(false);
        });
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

        if (product !== null) {
            setProduct(product);
        }
        else {
            console.error("Не удалось найти резервную копию товара");
        }

        setIsEditMode(false);
        setCancelEditModalShow(false);
    }

    if (product === null) {
        return (
            <h1>
                Грузим данные (скорее всего)
            </h1>
        )
    }

    return (
        <ItemPage
            deleteModalProps={{
                isShow: deleteModalShow,
                setIsShow: setDeleteModalShow,
                title: "Удаление товара",
                body: `Вы действительно хотите удалить ${product.name}?`,
                onDelete: deleteProduct
            }}
            cancelModalProps={{
                isShow: cancelEditModalShow,
                setIsShow: setCancelEditModalShow,
                title: "Отмена изменений",
                body: "Вы точно хотите отменить редактирование? Измененные данные не сохранятся.",
                onApprove: abortEdit
            }}
            itemPageBarProps={{
                isEditMode,
                backClickAction: () => navigate("/products"),
                cancelEditClickAction: () => setCancelEditModalShow(true),
                saveClickAction: saveProduct,
                editClickAction: editProduct,
                deleteClickAction: deleteProduct
            }}
        >
            <h1 className="text-center">{product.name}</h1>
            <Product
                product={product}
                setProduct={setProduct}
                isEditMode={isEditMode}
            />
        </ItemPage>
    );
}

export default ProductPage;