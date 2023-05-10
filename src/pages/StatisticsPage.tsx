import StatisticsWidget from "../components/StatisticsWidget/StatisticsWidget";
import { Col, Container, Row } from "react-bootstrap";
import { useClientsCount, useContractsCount, useProductsCount, useProvidersCount } from "../hooks/useCount";

const StatisticsPage = () => {
    const [contractsCount, isContractsCountLoading] = useContractsCount();
    const [openContractsCount, isOpenContractsCountLoading] = useContractsCount("open");
    const [closeContractsCount, isCloseContractsCountLoading] = useContractsCount("close");
    const [clientsCount, isClientsCountLoading] = useClientsCount();
    const [providersCount, isProvidersCountLoading] = useProvidersCount();
    const [productsCount, isProductsCountLoading] = useProductsCount();

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <StatisticsWidget
                        value={contractsCount}
                        isLoading={isContractsCountLoading}
                        name="Количество договоров"
                        className="mb-2"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        value={openContractsCount}
                        isLoading={isOpenContractsCountLoading}
                        name="Открытых договоров"
                        className="mb-2"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        value={closeContractsCount}
                        isLoading={isCloseContractsCountLoading}
                        name="Закрытых договоров"
                        className="mb-2"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <StatisticsWidget
                        value={clientsCount}
                        isLoading={isClientsCountLoading}
                        name="Количество клиентов"
                        className="mb-2"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        value={providersCount}
                        isLoading={isProvidersCountLoading}
                        name="Количество поставщиков"
                        className="mb-2"
                    />
                </Col>
                <Col>
                    <StatisticsWidget
                        value={productsCount}
                        isLoading={isProductsCountLoading}
                        name="Количество товаров"
                        className="mb-2"
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default StatisticsPage;