import API from "../api/API";
import useFetchState from "./useFetchState";

const useContracts = () => useFetchState(() => API.Contracts.Get(), []);

export default useContracts;