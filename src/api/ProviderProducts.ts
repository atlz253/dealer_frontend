import IBaseProduct from "audio_diler_common/interfaces/IBaseProduct";
import AbstractAPI from "./AbstractAPI";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IDeliveryDays from "audio_diler_common/interfaces/IDeliveryDays";

class ProviderProducts extends AbstractAPI {
    public static async Get(providerID: number): Promise<IBaseProduct[]> {
        const request = await axios.get<IBaseProduct[]>(baseURL + "/providers/" + providerID + "/products", {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Add(providerID: number, productID: number, deliveryDays: IDeliveryDays): Promise<void> {
        await axios.put(baseURL + "/providers/" + providerID + "/products/" + productID, deliveryDays, {
            headers: {
                authorization: this.authToken
            }
        });
    }

    public static async Delete(providerID: number, productID: number): Promise<void> {
        await axios.delete(baseURL + "/providers/" + providerID + "/products/" + productID, {
            headers: {
                authorization: this.authToken
            }
        });
    }
}

export default ProviderProducts;