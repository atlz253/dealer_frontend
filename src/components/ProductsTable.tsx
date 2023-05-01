import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import { FC } from 'react';
import { Table } from "react-bootstrap";
import IconButton from "./IconButton";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export enum ProductsIndexing {
    id,
    number
}

interface IProductTableProps {
    products: IBaseProduct[],
    addedProducts?: IBaseProduct[],
    indexing?: ProductsIndexing,
    onRowClick?: (id: number) => any,
    rowTitle?: string | undefined,
    onAddClick?: (product: IBaseProduct) => any,
    onRemoveClick?: (product: IBaseProduct) => any
}

const ProductsTable: FC<IProductTableProps> = ({ products, indexing = ProductsIndexing.id, onRowClick, rowTitle, onAddClick, addedProducts = [], onRemoveClick }) => {
    return (
        <Table hover={onRowClick !== undefined}>
            <thead>
                <tr>
                    <th>{indexing === ProductsIndexing.id ? "ID" : "№"}</th>
                    <th>Наименование товара</th>
                    <th>Категория</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
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
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
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