import axios from "axios";
import { baseURL } from "./APIconfig";
import AbstractAPI from "./AbstractAPI";
import IQueriesCategory from "dealer_common/interfaces/IQueriesCategory";

class Queries extends AbstractAPI {
    public static async Get(): Promise<IQueriesCategory[]> {
        const request = await axios.get<IQueriesCategory[]>(baseURL + "/queries", {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }
}

export default Queries;