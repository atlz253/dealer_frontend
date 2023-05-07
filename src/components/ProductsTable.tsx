import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import { Dispatch, FC, SetStateAction } from 'react';
import { Form, Table } from "react-bootstrap";
import IconButton from "./IconButton";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export enum ProductsIndexing {
    id,
    number
}

interface IProductTableProps {
    products: IBaseProduct[],
    setProducts?: Dispatch<SetStateAction<IBaseProduct[]>>,
    addedProducts?: IBaseProduct[],
    indexing?: ProductsIndexing,
    onRowClick?: (id: number) => any,
    rowTitle?: string | undefined,
    onAddClick?: (product: IBaseProduct) => any,
    onRemoveClick?: (product: IBaseProduct) => any,
    isQuantityChangeable?: boolean
}

const ProductsTable: FC<IProductTableProps> = ({ products, setProducts, indexing = ProductsIndexing.id, onRowClick, rowTitle, onAddClick, addedProducts = [], onRemoveClick, isQuantityChangeable }) => {
    const isProductsHaveDeliveryDays = products.length > 0 && products[0].deliveryDays !== undefined;
    const isProductsHaveDeliveryDate = products.length > 0 && products[0].deliveryDate !== undefined;

    const onDeliveryDateChange = (productID: number, value: string) => {
        if (setProducts === undefined) {
            console.warn("Невозможно поменять значение т к не была передана функция изменения состояния");

            return;
        }

        const days = Number(value);

        const newProducts = products.map(product => {
            if (product.id === productID) {
                product.deliveryDays = days;
            }

            return product;
        });

        setProducts(newProducts);
    }

    const onQuantityChange = (productID: number, value: string) => {
        if (setProducts === undefined) {
            console.warn("Невозможно поменять значение т к не была передана функция изменения состояния");

            return;
        }

        const quantity = Number(value);

        const newProducts = products.map(product => {
            if (product.id === productID) {
                product.quantity = quantity;
            }

            return product;
        });

        setProducts(newProducts);
    }

    return (
        <Table hover={onRowClick !== undefined}>
            <thead>
                <tr>
                    <th>{indexing === ProductsIndexing.id ? "ID" : "№"}</th>
                    <th>Наименование товара</th>
                    <th>Категория</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
                    {isProductsHaveDeliveryDays && <th>Время доставки (дней)</th>}
                    {isProductsHaveDeliveryDate && <th>Дата доставки</th>}
                    {(onRemoveClick || onAddClick) && <th></th>}
                </tr>
            </thead>
            <tbody>
                {products.map((product: IBaseProduct, index: number) =>
                    <tr
                        key={product.id}
                        onClick={() => {
                            if (onRowClick !== undefined) {
                                onRowClick(product.id);
                            }
                        }}
                        style={onRowClick !== undefined ? { cursor: "pointer" } : undefined}
                        title={rowTitle}
                    >
                        <td>{indexing === ProductsIndexing.id ? product.id : index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>
                            {
                                isQuantityChangeable ?
                                    <Form.Control
                                        type="number"
                                        value={product.quantity}
                                        onChange={event => onQuantityChange(product.id, event.target.value)}
                                    />
                                    :
                                    product.quantity

                            }
                        </td>
                        <td>{product.price}</td>
                        {
                            isProductsHaveDeliveryDays &&
                            <td>
                                <Form.Control
                                    type="number"
                                    value={product.deliveryDays}
                                    onChange={event => onDeliveryDateChange(product.id, event.target.value)}
                                    disabled={setProducts === undefined || addedProducts.filter(p => p.id === product.id).length !== 0} // TODO: Изменение времени доставки после окончания редактирования поля
                                />
                            </td>
                        }
                        {isProductsHaveDeliveryDate && <td>{product.deliveryDate}</td>}
                        {
                            (onRemoveClick || onAddClick) &&
                            <td>
                                {
                                    (
                                        onAddClick && addedProducts.filter(p => p.id === product.id).length === 0 &&
                                        <IconButton
                                            icon={faPlus}
                                            variant="link"
                                            onClick={() => onAddClick(product)}
                                        />
                                    )

                                    ||

                                    (
                                        onRemoveClick &&
                                        <IconButton
                                            icon={faTrash}
                                            variant="link"
                                            onClick={() => onRemoveClick(product)}
                                        />
                                    )
                                }
                            </td>
                        }

                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default ProductsTable;