import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import IProduct from "audio_diler_common/interfaces/IProduct";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";
import ID from "audio_diler_common/interfaces/ID";

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

    public static async CreateProduct(accessToken: string, product: IProduct): Promise<IResponse<ID> | null> {
        try {
            const request = await axios.post<IResponse<ID>>(baseURL + "/products/new", product, {
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

    public static async SaveProduct(accessToken: string, product: IProduct): Promise<IResponse<IResponse> | null> {
        try {
            const request = await axios.put<IResponse<IResponse>>(baseURL + "/products/" + product.id, product, {
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