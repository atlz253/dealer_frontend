import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import IProduct from "audio_diler_common/interfaces/IProduct";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";
import ID from "audio_diler_common/interfaces/ID";

class Products {
    public static async Get(accessToken: string): Promise<IBaseProduct[]> {
        const request = await axios.get<IBaseProduct[]>(baseURL + "/products", {
            headers: {
                authorization: accessToken
            }
        });

        return request.data;
    }

    public static async GetProduct(accessToken: string, id: string): Promise<IProduct> {
        const request = await axios.get<IProduct>(baseURL + "/products/" + id, {
            headers: {
                authorization: accessToken
            }
        });

        return request.data;
    }

    public static async CreateProduct(accessToken: string, product: IProduct): Promise<ID> {
        const request = await axios.post<ID>(baseURL + "/products/new", product, {
            headers: {
                authorization: accessToken
            }
        });

        return request.data;
    }

    public static async SaveProduct(accessToken: string, product: IProduct): Promise<void> {
        await axios.put(baseURL + "/products/" + product.id, product, {
            headers: {
                authorization: accessToken
            }
        });
    }

    public static async DeleteProduct(accessToken: string, id: number): Promise<void> {
        await axios.delete(baseURL + "/products/" + id, {
            headers: {
                authorization: accessToken
            }
        });
    }
}

export default Products;