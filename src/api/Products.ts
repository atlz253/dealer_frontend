import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import IProduct from "audio_diler_common/interfaces/IProduct";
import axios from "axios";
import { baseURL } from "./APIconfig";
import ID from "audio_diler_common/interfaces/ID";
import AbstractAPI from "./AbstractAPI";

class Products extends AbstractAPI {
    public static async Get(): Promise<IBaseProduct[]> {
        const request = await axios.get<IBaseProduct[]>(baseURL + "/products", {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async GetByID(id: number): Promise<IProduct> {
        const request = await axios.get<IProduct>(baseURL + "/products/" + id, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Create(product: IProduct): Promise<ID> {
        const request = await axios.post<ID>(baseURL + "/products/new", product, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Save(product: IProduct): Promise<void> {
        await axios.put(baseURL + "/products/" + product.id, product, {
            headers: {
                authorization: this.authToken
            }
        });
    }

    public static async Delete(id: number): Promise<void> {
        await axios.delete(baseURL + "/products/" + id, {
            headers: {
                authorization: this.authToken
            }
        });
    }
}

export default Products;