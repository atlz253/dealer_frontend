import IQueriesCategory from "dealer_common/interfaces/IQueriesCategory";
import useFetchData from "./useFetchData";
import API from "../api/API";

const useQueriesCategory = () => useFetchData<IQueriesCategory[]>(() => API.Queries.Get(), []);
 
export default useQueriesCategory;