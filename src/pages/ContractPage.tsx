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

const ContractPage: FC = () => {
    const { contractID } = useParams();
    const [contract, setContract] = useState<IContract>({
        id: 0,
        seller: "",
        buyer: "",
        price: 123,
        date: 111,
        sellerBill: {
            id: 0,
            correspondentBill: "",
            BIC: "",
            INN: "",
            ownerName: "",
            billNumber: "",
            bankName: "",
            expireDate: "",
            ownerType: ""
        },
        buyerBill: {
            id: 1,
            correspondentBill: "",
            BIC: "",
            INN: "",
            ownerName: "",
            billNumber: "",
            bankName: "",
            expireDate: "",
            ownerType: ""
        },
        products: []
    });
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            if (contractID === undefined) {
                console.error("Не удалось получить ID контракта");

                return;
            }

            const response = await API.Contracts.GetContract(contractID);

            if (response === null || response.status !== 200 || response.data === undefined) {
                alert("Не удалось получить данные");

                return;
            }

            setContract(response.data);
        }

        fetch();
    }, []);

    const deleteContract = () => {
        navigate("/contracts");
    }

    if (contract === null) {
        return (
            <h1>
                Грузим данные (скорее всего)
            </h1>
        )
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
                isShow: false,
                setIsShow: (value) => {},
                title: "",
                body: ""
            }}
            itemPageBarProps={{
                isEditMode: false,
                backClickAction: () => navigate("/contracts"),
            }}
        >
            <h1 className="text-center">
                Договор №{contract.id}
            </h1>
            <Contract
                contract={contract}
                setContract={setContract}
                isEditMode={isEditMode}
            />
        </ItemPage>
    );
}

export default ContractPage;