import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import React, { FC } from 'react';
import { Table } from "react-bootstrap";

export enum ProductsIndexing {
    id,
    number
}

interface IProductTableProps {
    products: IBaseProduct[],
    indexing?: ProductsIndexing,
    onRowClick?: (id: number) => any | undefined,
    rowTitle?: string | undefined
}

const ProductsTable: FC<IProductTableProps> = ({ products, indexing = ProductsIndexing.id, onRowClick = undefined, rowTitle = undefined }) => {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>{indexing === ProductsIndexing.id ? "ID" : "№"}</th>
                    <th>Наименование товара</th>
                    <th>Категория</th>
                    <th>Количество</th>
                    <th>Стоимость</th>
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
                        style={onRowClick !== undefined ? {cursor: "pointer"} : undefined}
                        title={rowTitle}
                    >
                        <td>{indexing === ProductsIndexing.id ? product.id : index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default ProductsTable;