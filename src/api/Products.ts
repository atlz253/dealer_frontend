import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import IProduct from "audio_diler_common/interfaces/IProduct";
import axios from "axios";
import { baseURL } from "./APIconfig";

class Products {
    public static async Get(): Promise<IBaseProduct[]> {
        try {
            const request = await axios.get<IBaseProduct[]>(baseURL + "/products");
        
            return request.data;
        } catch (e) {
            console.error(e);
            
            return [];
        }
    }

    public static async GetProduct(id: string): Promise<IProduct | null> {
        try {
            const request = await axios.get<IProduct>(baseURL + "/products/" + id);

            return request.data;
        } catch (e) {
            console.error(e);
            
            return null;
        }
    }
}

export default Products;