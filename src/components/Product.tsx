import IProduct from "dealer_common/interfaces/IProduct";
import NamedInput, { NamedInputType } from "./NamedInputs/NamedInput";
import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";

interface IProductProps {
    product: IProduct,
    setProduct: Dispatch<SetStateAction<IProduct>>,
    isEditMode?: boolean
}

const Product: FC<IProductProps> = ({ product, setProduct, isEditMode }) => {
    const [price, setPrice] = useState<string>("");

    useEffect(() => {
        const priceStr = product.price.toString();

        if (price === priceStr) {
            return;
        }

        setPrice(priceStr);
    }, [product]);

    return (
        <div>
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
                name="Производитель"
                value={product.manufacturer}
                onChange={(value: string) => setProduct({ ...product, manufacturer: value })}
                disabled={!isEditMode}
            />
            <NamedInput
                name="Цена"
                value={price}
                onChange={(value: string) => {
                    const num = Number(value);

                    if (!Number.isNaN(num) && value[value.length - 1] !== ".") {
                        setProduct({ ...product, price: num });
                    }

                    setPrice(value)
                }}
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
    );
}

export default Product;