import IBaseContract from "audio_diler_common/interfaces/IBaseContract";
import IContract from "audio_diler_common/interfaces/IContract";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";
import AbstractAPI from "./AbstractAPI";
import INewContract from "audio_diler_common/interfaces/INewContract";
import ID from "audio_diler_common/interfaces/ID";

class Contracts extends AbstractAPI {
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