import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IContract from 'audio_diler_common/interfaces/IContract';
import API from '../api/API';
import Bill from '../components/Bill';
import IBill from 'audio_diler_common/interfaces/IBill';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import IconButton from "../components/IconButton";
import DeleteModal from "../components/DeleteModal";
import ProductsTable, { ProductsIndexing } from "../components/ProductsTable";
import { AuthContext, IAuthContext } from "../context";
import Contract from "../components/Contract";
import ItemPage from '../components/ItemPage';
import tryServerRequest from '../utils/tryServerRequest';
import INewContract from 'audio_diler_common/interfaces/INewContract';
import IProductQuantity from 'audio_diler_common/interfaces/IProductQuantity';

interface IContractPageProps {
    newContract?: boolean
}

const ContractPage: FC<IContractPageProps> = ({ newContract }) => {
    const { contractID } = useParams();
    const [contract, setContract] = useState<IContract>({
        id: 0,
        sellerName: "",
        buyerName: "",
        price: 0,
        created: "",
        sellerBill: {
            id: 0,
            correspondentBill: "",
            BIC: "",
            INN: "",
            ownerName: "",
            billNumber: "",
            bankName: "",
            expireDate: ""
        },
        buyerBill: {
            id: 1,
            correspondentBill: "",
            BIC: "",
            INN: "",
            ownerName: "",
            billNumber: "",
            bankName: "",
            expireDate: ""
        },
        products: []
    });
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [cancelModalShow, setCancelModalShow] = useState<boolean>(false);
    const navigate = useNavigate();

    const getContract = (id: number) => {
        tryServerRequest(async () => {
            const contract = await API.Contracts.GetByID(id);

            setContract(contract);
        });
    }

    useEffect(() => {
        if (newContract) {
            setIsEditMode(true);

            return;
        }

        if (API.AuthToken === "") {
            return;
        }

        getContract(Number(contractID));
    }, []);

    const deleteContract = () => {
        navigate("/contracts");
    }

    const saveContract = () => {
        tryServerRequest(async () => {
            const newContract: INewContract = {
                id: 0,
                sellerBillID: contract.sellerBill.id,
                buyerBillID: contract.buyerBill.id,
                products: contract.products.map(product => {
                    const productQuantity: IProductQuantity = {
                        id: product.id, 
                        quantity: product.quantity
                    }

                    return productQuantity;
                })
            };
            
            const response = await API.Contracts.Create(newContract);

            navigate("/contracts/" + response.id);
            
            getContract(response.id);

            setIsEditMode(false);
        });
    }

    return (
        <ItemPage
            deleteModalProps={{
                isShow: deleteModalShow,
                setIsShow: setDeleteModalShow,
                title: "Удаление договора",
                body: `Вы действительно хотите удалить договор №${contract.id}?`
            }}
            cancelModalProps={{
                isShow: cancelModalShow,
                setIsShow: setCancelModalShow,
                title: "Отмена изменений",
                body: "Вы точно хотите отменить редактирование? Измененные данные не сохранятся.", // TODO: реализовать cancelEditModal
                onApprove: () => navigate("/contracts")
            }}
            itemPageBarProps={{
                isEditMode: isEditMode,
                backClickAction: () => navigate("/contracts"),
                saveClickAction: saveContract,
                cancelEditClickAction: () => setCancelModalShow(true)
            }}
        >
            <h1 className="text-center">
                Договор №{contract.id}
            </h1>
            <Contract
                contract={contract}
                setContract={setContract}
                isEditMode={isEditMode}
                newContract={newContract}
            />
        </ItemPage>
    );
}

export default ContractPage;