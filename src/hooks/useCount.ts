import { useState } from "react";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import ICount from "dealer_common/interfaces/ICount";

const useCount = (fetchFunc: () => Promise<ICount>): [number, boolean] => {
    const [contractsCount, setContractsCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    tryServerRequest(async () => {
        const contractsCount = await fetchFunc();

        setIsLoading(false);
        setContractsCount(contractsCount.count);
    });

    return [
        contractsCount,
        isLoading
    ];
}

export const useContractsCount = (contractStatus?: string) => useCount(() => API.Contracts.GetCount(contractStatus));

export const useClientsCount = () => useCount(() => API.Clients.GetCount());

export const useProvidersCount = () => useCount(() => API.Providers.GetCount());

export const useProductsCount = () => useCount(() => API.Products.GetCount());