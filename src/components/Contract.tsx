import IBill from "audio_diler_common/interfaces/IBill";
import Bill from "./Bill";
import ProductsTable, { ProductsIndexing } from "./ProductsTable";
import IContract from "audio_diler_common/interfaces/IContract";
import { FC, Dispatch, SetStateAction, useEffect, useState, ChangeEvent } from "react";
import Categories from "./Categories/Categories"
import NamedSelect from "./NamedInputs/NamedSelect";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import IName from "audio_diler_common/interfaces/IName";
import IBillNumber from "audio_diler_common/interfaces/IBillNumber";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import ProductsModal from "./ProductsModal";
import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";

interface IContractProps {
    contract: IContract,
    setContract: Dispatch<SetStateAction<IContract>>,
    isEditMode?: boolean,
    newContract?: boolean
}

const Contract: FC<IContractProps> = ({ contract, setContract, isEditMode, newContract }) => {
    const [buyersNames, setBuyersNames] = useState<IName[]>([]);
    const [buyerBillsNumbers, setBuyerBillsNumbers] = useState<IBillNumber[]>([]);
    const [buyerBillOwnerSelect, setBuyerBillOwnerSelect] = useState<string>("default");
    const [buyerBillNumberSelect, setBuyerBillNumberSelect] = useState<string>("default");
    const [sellerBillsNumbers, setSellersBillsNumbers] = useState<IBillNumber[]>([]);
    const [sellerBillNumberSelect, setSellerBillNumberSelect] = useState<string>("default");
    const [productsModalShow, setProductsModalShow] = useState<boolean>(false);

    useEffect(() => {
        if (!newContract) {
            return;
        }

        if (API.AuthToken === "") {
            return;
        }

        tryServerRequest(async () => {
            const clientsNames = await API.Clients.Get(true);

            setBuyersNames(clientsNames as IName[]);
        });

        tryServerRequest(async () => {
            const sellerBillsNumbers = await API.Bills.Get(true);

            setSellersBillsNumbers(sellerBillsNumbers);
        });
    }, []);

    const buyerBillOwnerChange = (value: string) => {
        tryServerRequest(async () => {
            const ID = Number(value);

            const buyerBillsNumbers = await API.Clients.Bills.Get(ID, true);

            setBuyerBillOwnerSelect(value);
            setBuyerBillNumberSelect("default");
            setBuyerBillsNumbers(buyerBillsNumbers);
        });
    };

    const addProduct = (product: IBaseProduct) => {
        const products = [...contract.products, product];

        setContract({ ...contract, products});
    };

    const removeProduct = (product: IBaseProduct) => {
        const products = contract.products.filter(p => p.id !== product.id);

        setContract({...contract, products});
    };
    
    const changeSellerBill = (value: string) => {
        setSellerBillNumberSelect(value);

        setContract({...contract, sellerBill: {...contract.sellerBill, id: Number(value)}});
    };
    
    const changeBuyerBill = (value: string) => {
        setBuyerBillNumberSelect(value);

        setContract({...contract, buyerBill: {...contract.buyerBill, id: Number(value)}});
    };

    return (
        <>
            <Categories defaultActiveKey={["0"]}>
                <Categories.Item
                    name="Счет продавца"
                    eventKey="0"
                    notClosable
                >
                    {
                        (
                            newContract &&
                            <NamedSelect
                                name="Номер счета"
                                value={sellerBillNumberSelect}
                                onChange={event => changeSellerBill(event.target.value)}
                            >
                                <option value="default" disabled>Выберите номер счета</option>
                                {sellerBillsNumbers.map(bill => <option key={bill.id} value={bill.id}>{bill.billNumber}</option>)}
                            </NamedSelect>
                        )

                        ||

                        <Bill
                            bill={contract.sellerBill}
                            setBill={(value: IBill) => setContract({ ...contract, sellerBill: value })}
                            isEditMode={false}
                            newBill={newContract}
                        />
                    }
                </Categories.Item>
                <Categories.Item
                    name="Счет покупателя"
                    eventKey="0"
                    notClosable
                >
                    {
                        (
                            newContract &&
                            <>
                                <NamedSelect
                                    name="Владелец"
                                    value={buyerBillOwnerSelect}
                                    onChange={event => buyerBillOwnerChange(event.target.value)}
                                >
                                    <option value="default" disabled>Выберите владельца счета</option>
                                    {buyersNames.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                                </NamedSelect>
                                <NamedSelect
                                    name="Номер счета"
                                    value={buyerBillNumberSelect}
                                    onChange={event => changeBuyerBill(event.target.value)}
                                    disabled={buyerBillOwnerSelect === "default"}
                                >
                                    <option value="default" disabled>Выберите номер счета</option>
                                    {buyerBillsNumbers.map(bill => <option key={bill.id} value={bill.id}>{bill.billNumber}</option>)}
                                </NamedSelect>
                            </>
                        )

                        ||

                        <Bill
                            bill={contract.buyerBill}
                            setBill={(value: IBill) => setContract({ ...contract, buyerBill: value })}
                            isEditMode={false}
                            newBill={newContract}
                        />
                    }

                </Categories.Item>
                <Categories.Item
                    name="Товары"
                    eventKey="0"
                    notClosable
                >
                    {
                        newContract &&
                        <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
                            <IconButton
                                icon={faPlus}
                                text="Добавить"
                                className="ms-1"
                                onClick={() => setProductsModalShow(true)}
                            />
                        </div>
                    }
                    <ProductsTable
                        products={contract.products}
                        indexing={ProductsIndexing.number}
                        addedProducts={contract.products}
                        onRemoveClick={newContract ? removeProduct : undefined}
                    />
                </Categories.Item>
            </Categories>
            {
                productsModalShow &&
                <ProductsModal
                    isShow={productsModalShow}
                    setIsShow={setProductsModalShow}
                    onAddClick={addProduct}
                    addedProducts={contract.products}
                    onRemoveClick={removeProduct}
                />
            }
        </>
    );
}

export default Contract;