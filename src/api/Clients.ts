import IBaseClient from "audio_diler_common/interfaces/IBaseClient";
import AbstractAPI from "./AbstractAPI";
import axios from "axios";
import { baseURL } from "./APIconfig";

class Clients extends AbstractAPI {
    public static async Get(): Promise<IBaseClient[]> {
        const response = await axios.get<IBaseClient[]>(baseURL + "/clients", {
            headers: {
                authorization: this.authToken
            }
        })

        return response.data;
    } 
}

export default Clients;