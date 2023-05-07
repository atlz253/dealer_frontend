import { FC, useEffect, useState } from "react";
import ItemPage from "../components/ItemPage";
import IProvider from "audio_diler_common/interfaces/IProvider";
import Provider from "../components/Provider";
import Categories from "../components/Categories/Categories";
import API from "../api/API";
import tryServerRequest from "../utils/tryServerRequest";
import { useNavigate, useParams } from "react-router-dom";
import IBaseBill from "audio_diler_common/interfaces/IBaseBill";
import BillsTable from "../components/BillsTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../components/IconButton";
import BillModal from "../components/BillModal";
import IBill from "audio_diler_common/interfaces/IBill";
import Bills from "../components/Bills";
import Products from "../components/Products";
import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import IProduct from "audio_diler_common/interfaces/IProduct";

interface IProviderPageProps {
    newProvider?: boolean
}

const ProviderPage: FC<IProviderPageProps> = ({ newProvider }) => {
    const { providerID } = useParams();
    const [provider, setProvider] = useState<IProvider>({
        id: 0,
        phone: "",
        address: "",
        added: "",
        name: ""
    });
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelEditModalShow, setCancelEditModalShow] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const navigate = useNavigate();
    const [bills, setBills] = useState<IBaseBill[] | null>(null);
    const [providerProducts, setProviderProducts] = useState<IBaseProduct[] | null>(null);
    const [products, setProducts] = useState<IBaseProduct[]>([]);

    useEffect((): any => {
        if (newProvider) {
            setIsEditMode(true);

            return;
        }

        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const provider = await API.Providers.GetByID(Number(providerID))

            setProvider(provider);
        });
    }, []);

    const saveProvider = () => {
        tryServerRequest(async () => {
            const response = await API.Providers.Create(provider);

            navigate("/providers/" + response.id);

            setProvider({ ...provider, id: response.id });

            setIsEditMode(false);
        });
    }

    const abortEdit = () => {
        if (newProvider) {
            navigate("/providers");

            return;
        }

    }

    const loadBills = () => {
        if (bills !== null) {
            return;
        }

        tryServerRequest(async () => {
            const bills = await API.Providers.Bills.Get(Number(providerID));

            setBills(bills as IBaseBill[]);
        });
    }

    const loadProducts = () => {
        if (providerProducts !== null) {
            return;
        }

        tryServerRequest(async () => {
            const providerProducts = await API.Providers.Products.Get(Number(providerID));

            setProviderProducts(providerProducts);
        });

        tryServerRequest(async () => {
            let products = await API.Products.Get();

            products.forEach(product => product.deliveryDays = 0);

            setProducts(products);
        })
    }

    const addProduct = (product: IBaseProduct) => {
        tryServerRequest(async () => {
            if (product.deliveryDays === undefined) {
                throw new Error("У товара отсутствует время доставки");
            }    
            
            await API.Providers.Products.Add(Number(providerID), product.id, { deliveryDays: product.deliveryDays });

            if (providerProducts === null) {
                return;
            }

            setProviderProducts([...providerProducts, product]);
        });
    }

    const removeProduct = (product: IBaseProduct) => {
        tryServerRequest(async () => {
            await API.Providers.Products.Delete(Number(providerID), product.id);

            if (providerProducts === null) {
                return;
            }

            const newProviderProducts = providerProducts.filter(p => p.id !== product.id);

            setProviderProducts(newProviderProducts);
        });
    }

    return (
        <ItemPage
            deleteModalProps={{
                isShow: deleteModalShow,
                setIsShow: setDeleteModalShow,
                title: "Удаление записи о поставщике",
                body: `Вы точно хотите удалить запись о ${provider.name}?`
            }}
            cancelModalProps={{
                isShow: cancelEditModalShow,
                setIsShow: setCancelEditModalShow,
                title: "Отмена изменений",
                body: "Вы точно хотите отменить редактирование? Измененные данные не сохранятся.",
                onApprove: abortEdit
            }}
            itemPageBarProps={{
                isEditMode: isEditMode,
                saveClickAction: saveProvider,
                cancelEditClickAction: () => setCancelEditModalShow(true)
            }}
        >
            <Categories defaultActiveKey={["0"]} alwaysOpen>
                <Categories.Item
                    eventKey="0"
                    name="Общая информация"
                    notClosable
                >
                    <Provider
                        provider={provider}
                        setProvider={setProvider}
                        isEditMode={isEditMode}
                    />
                </Categories.Item>
                {
                    !newProvider &&
                    <>
                        <Categories.Item
                            eventKey="1"
                            name={`Счета ${provider.name}`}
                            onClick={loadBills}
                        >
                            <Bills
                                bills={bills}
                                setBills={setBills}
                                getBill={(id: number) => API.Providers.Bills.GetByID(Number(providerID), id)}
                                createBill={(bill: IBill) => API.Providers.Bills.Create(Number(providerID), bill)}
                                saveBill={(bill: IBill) => API.Providers.Bills.Save(Number(providerID), bill)}
                                deleteBill={(id: number) => API.Providers.Bills.Delete(Number(providerID), id)}
                            />
                        </Categories.Item>
                        <Categories.Item
                            eventKey="2"
                            name="Поставляемые товары"
                            onClick={loadProducts}
                        >
                            {
                                providerProducts &&
                                <Products
                                    products={providerProducts}
                                    addProduct={addProduct}
                                    removeProduct={removeProduct}
                                    productsModalProps={{
                                        products: products,
                                        setProducts: setProducts
                                    }}
                                    productModalProps={{
                                        getProduct: (id: number) => API.Products.GetByID(id)
                                    }}
                                />
                            }
                        </Categories.Item>
                    </>
                }
            </Categories>
        </ItemPage>
    );
}

export default ProviderPage;