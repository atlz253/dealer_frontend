import axios from "axios";
import IContract from '../../node_modules/audio_diler_common/interfaces/IContract';
import { baseURL } from "./APIconfig";

class API {
    public static async GetContracts(): Promise<IContract[]> {
        try {
            const request = await axios.get<IContract[]>(baseURL + "/contracts");
        
            return request.data;
        } catch (e) {
            console.error(e);

            return [];
        }
    }
}

export default API;