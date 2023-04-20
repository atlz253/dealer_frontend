import IBaseContract from "audio_diler_common/interfaces/IBaseContract";
import IContract from "audio_diler_common/interfaces/IContract";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";
import AbstractAPI from "./AbstractAPI";

class Contracts extends AbstractAPI {
    public static async Get(): Promise<IResponse<IBaseContract[]> | null> {
        try {
            const request = await axios.get<IResponse<IBaseContract[]>>(baseURL + "/contracts", {
                headers: {
                    authorization: this.authToken
                }
            });

            return request.data;
        } catch (e) {
            console.error(e);

            return null;
        }
    }

    public static async GetContract(id: string): Promise<IResponse<IContract> | null> {
        try {
            const request = await axios.get<IResponse<IContract>>(baseURL + "/contracts/" + id, {
                headers: {
                    authorization: this.authToken
                }
            });

            return request.data;
        } catch (e) {
            console.error(e);

            return null;
        }
    }
}

export default Contracts;