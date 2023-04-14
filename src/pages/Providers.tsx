import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

const Providers: FC = () => {
    return (
        <div className="d-flex flex-fill flex-column p-1">
            <div className="d-flex flex-fill" style={{ maxHeight: "50px" }}>
                <Form.Control type="text" placeholder="Поиск" />
                <Button className="w-25 ms-1">
                    <FontAwesomeIcon icon={faPlus} />
                    Добавить
                </Button>
            </div>
            <Table striped bordered hover className="mt-1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Наименование</th>
                        <th>Кол-во товаров</th>
                        <th>Добавлен</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0</td>
                        <td>ООО «Поставщик»</td>
                        <td>10</td>
                        <td>01.04.23</td>
                    </tr>
                    <tr>
                        <td>0</td>
                        <td>ООО «Поставщик»</td>
                        <td>10</td>
                        <td>01.04.23</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default Providers;
