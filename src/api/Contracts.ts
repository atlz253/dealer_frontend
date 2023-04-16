import IBaseContract from "audio_diler_common/interfaces/IBaseContract";
import IContract from "audio_diler_common/interfaces/IContract";
import axios from "axios";
import { baseURL } from "./APIconfig";

class Contracts {
    public static async Get(): Promise<IBaseContract[]> {
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

export default Contracts;