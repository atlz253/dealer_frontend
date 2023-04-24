import IBill from "audio_diler_common/interfaces/IBill";
import Bill from "./Bill";
import ProductsTable, { ProductsIndexing } from "./ProductsTable";
import IContract from "audio_diler_common/interfaces/IContract";
import { FC, Dispatch, SetStateAction } from "react";

interface IContractProps {
    contract: IContract,
    setContract: Dispatch<SetStateAction<IContract>>,
    isEditMode?: boolean
}

const Contract: FC<IContractProps> = ({ contract, setContract, isEditMode }) => {
    return (
        <div>
            <h2>
                Счет продавца
            </h2>
            <Bill
                bill={contract.sellerBill}
                setBill={(value: IBill) => setContract({ ...contract, sellerBill: value })}
                isEditMode={true}
            />
            <h2 className="mt-3">
                Счет покупателя
            </h2>
            <Bill
                bill={contract.buyerBill}
                setBill={(value: IBill) => setContract({ ...contract, buyerBill: value })}
                isEditMode={true}
            />
            <h2 className="mt-3">
                Товары
            </h2>
            <ProductsTable
                products={contract.products}
                indexing={ProductsIndexing.number}
            />
        </div>
    );
}

export default Contract;