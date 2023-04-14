import axios from "axios";
import IBaseContract from '../../node_modules/audio_diler_common/interfaces/IBaseContract';
import { baseURL } from "./APIconfig";
import IContract from "audio_diler_common/interfaces/IContract";

class API {
    public static async GetContracts(): Promise<IBaseContract[]> {
        try {
            const request = await axios.get<IBaseContract[]>(baseURL + "/contracts");
        
            return request.data;
        } catch (e) {
            console.error(e);

            return [];
        }
    }

    public static async GetContract(id: string): Promise<IContract | null> {
        try {
            const request = await axios.get<IContract>(baseURL + "/contracts/" + id);

            return request.data;
        } catch (e) {
            console.error(e);
            
            return null;
        }
    }
}

export default API;