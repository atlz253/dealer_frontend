import IBaseContract from "dealer_common/interfaces/IBaseContract";
import IContract from "dealer_common/interfaces/IContract";
import axios from "axios";
import { baseURL } from "./APIconfig";
import AbstractAPI from "./AbstractAPI";
import INewContract from "dealer_common/interfaces/INewContract";
import ID from "dealer_common/interfaces/ID";
import Cheques from "./Cheques";
import ICount from "dealer_common/interfaces/ICount";

class Contracts extends AbstractAPI {
    public static SetAuthToken(token: string): void {
        super.SetAuthToken(token);

        Cheques.SetAuthToken(token);
    }

    public static get Cheques(): typeof Cheques {
        return Cheques;
    }

    public static async Get(): Promise<IBaseContract[]> {
        const request = await axios.get<IBaseContract[]>(baseURL + "/contracts", {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async GetByID(id: number): Promise<IContract> {
        const request = await axios.get<IContract>(baseURL + "/contracts/" + id, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async GetCount(contractStatus?: string): Promise<number> {
        const request = await axios.get<ICount>(baseURL + "/contracts/count", {
            headers: {
                authorization: this.authToken
            },
            params: {
                contractStatus
            }
        });

        return request.data.count;
    }

    public static async Create(contract: INewContract): Promise<ID> {
        const request = await axios.post<ID>(baseURL + "/contracts/new", contract, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }
}

export default Contracts;