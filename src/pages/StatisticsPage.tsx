import { useEffect, useState } from "react";
import StatisticsWidget from "../components/StatisticsWidget";
import { Col, Container, Row } from "react-bootstrap";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";

const StatisticsPage = () => {
    const [contractsCount, setContractsCount] = useState<number | null>(null);
    const [openContractsCount, setOpenContractsCount] = useState<number | null>(null);
    const [closeContractsCount, setCloseContractsCount] = useState<number | null>(null);
    const [clientsCount, setClientsCount] = useState<number | null>(null);
    const [providersCount, setProvidersCount] = useState<number | null>(null);
    const [productsCount, setProductsCount] = useState<number | null>(null);

    useEffect(() => {
        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const contractsCount = await API.Contracts.GetCount();

            setContractsCount(contractsCount.count);
        });

        tryServerRequest(async () => {
            const openContractsCount = await API.Contracts.GetCount("open");

            setOpenContractsCount(openContractsCount.count);
        });

        tryServerRequest(async () => {
            const closeContractsCount = await API.Contracts.GetCount("close");

            setCloseContractsCount(closeContractsCount.count);
        });

        tryServerRequest(async () => {
            const clientsCount = await API.Clients.GetCount();

            setClientsCount(clientsCount.count);
        });

        tryServerRequest(async () => {
            const providersCount = await API.Providers.GetCount();

            setProvidersCount(providersCount.count);
        });

        tryServerRequest(async () => {
            const productsCount = await API.Products.GetCount();

            setProductsCount(productsCount.count);
        });
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <StatisticsWidget
                        value={contractsCount}
                        name="Количество договоров"
                        className="mb-2"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        value={openContractsCount}
                        name="Открытых договоров"
                        className="mb-2"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        value={closeContractsCount}
                        name="Закрытых договоров"
                        className="mb-2"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <StatisticsWidget
                        value={clientsCount}
                        name="Количество клиентов"
                        className="mb-2"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        value={providersCount}
                        name="Количество поставщиков"
                        className="mb-2"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        value={productsCount}
                        name="Количество товаров"
                        className="mb-2"
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default StatisticsPage;