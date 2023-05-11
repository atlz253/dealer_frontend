import { Button, Spinner } from "react-bootstrap";
import Categories from "../components/Categories/Categories";
import useQueriesCategory from "../hooks/useQueriesCategory";
import API from "../api/API";

const QueriesPage = () => {
    const [categories, isLoading] = useQueriesCategory();

    if (isLoading) {
        return (
            <div className="d-flex flex-fill justify-content-center align-items-center p-1">
                <Spinner animation="border" />
            </div>
        )
    }

    return (
        <div className="d-flex flex-fill flex-column p-1">
            <Categories>
                {categories.map(category =>
                    <Categories.Item
                        key={category.name}
                        name={category.name}
                        eventKey={category.name}
                        className="d-flex flex-column align-items-center"
                    >
                        {category.items.map(item =>
                            <Button
                                key={item.name}
                                className="mt-2"
                                style={{ width: "500px" }}
                                onClick={() => API.DownloadFile(item.link, `${item.name}.xlsx`)}
                            >
                                {item.name}
                            </Button>
                        )}
                    </Categories.Item>
                )}
            </Categories>
        </div>
    );
}

export default QueriesPage;