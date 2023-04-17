import IBaseContract from "audio_diler_common/interfaces/IBaseContract";
import IContract from "audio_diler_common/interfaces/IContract";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";

class Contracts {
    public static async Get(accessToken: string): Promise<IResponse<IBaseContract[]> | null> {
        try {
            const request = await axios.get<IResponse<IBaseContract[]>>(baseURL + "/contracts", {
                headers: {
                    authorization: accessToken
                }
            });

            return request.data;
        } catch (e) {
            console.error(e);

            return null;
        }
    }

    public static async GetContract(accessToken: string, id: string): Promise<IResponse<IContract> | null> {
        try {
            const request = await axios.get<IResponse<IContract>>(baseURL + "/contracts/" + id, {
                headers: {
                    authorization: accessToken
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