import API from "../api/API";
import useFetchData from "./useFetchData";

export const useContractsCount = (contractStatus?: string) => useFetchData(() => API.Contracts.GetCount(contractStatus), 0);

export const useClientsCount = () => useFetchData(() => API.Clients.GetCount(), 0);

export const useProvidersCount = () => useFetchData(() => API.Providers.GetCount(), 0);

export const useProductsCount = () => useFetchData(() => API.Products.GetCount(), 0);