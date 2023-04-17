import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import IProduct from "audio_diler_common/interfaces/IProduct";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";

class Products {
    public static async Get(accessToken: string,): Promise<IResponse<IBaseProduct[]> | null> {
        try {
            const request = await axios.get<IResponse<IBaseProduct[]>>(baseURL + "/products", {
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

    public static async GetProduct(accessToken: string, id: string): Promise<IResponse<IProduct> | null> {
        try {
            const request = await axios.get<IResponse<IProduct>>(baseURL + "/products/" + id, {
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

export default Products;