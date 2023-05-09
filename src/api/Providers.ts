import IBaseProvider from "dealer_common/interfaces/IBaseProvider";
import AbstractAPI from "./AbstractAPI";
import ProviderBills from "./ProviderBills";
import ProviderProducts from "./ProviderProducts";
import IName from "dealer_common/interfaces/IName";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IProvider from "dealer_common/interfaces/IProvider";
import ID from "dealer_common/interfaces/ID";
import ICount from "dealer_common/interfaces/ICount";

class Providers extends AbstractAPI {
    public static SetAuthToken(token: string): void {
        super.SetAuthToken(token);

        ProviderBills.SetAuthToken(token);
        ProviderProducts.SetAuthToken(token);
    }

    public static get Bills(): typeof ProviderBills {
        return ProviderBills;
    }

    public static get Products(): typeof ProviderProducts {
        return ProviderProducts;
    }

    public static async Get(onlyNames?: boolean): Promise<IBaseProvider[] | IName[]> {
        const response = await axios.get<IBaseProvider[] | IName[]>(baseURL + "/providers", {
            headers: {
                authorization: this.authToken
            },
            params: {
                onlyNames
            }
        });

        return response.data;
    }

    public static async GetByID(providerID: number): Promise<IProvider> {
        const response = await axios.get<IProvider>(baseURL + "/providers/" + providerID, {
            headers: {
                authorization: this.authToken
            }
        });

        return response.data;
    }

    public static async GetCount(): Promise<number> {
        const request = await axios.get<ICount>(baseURL + "/providers/count", {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data.count;
    }

    public static async Create(provider: IProvider): Promise<ID> {
        const response = await axios.post<ID>(baseURL + "/providers/" + provider.id, provider, {
            headers: {
                authorization: this.authToken
            }
        });

        return response.data;
    }

    public static async Save(provider: IProvider): Promise<void> {
        await axios.put<ID>(baseURL + "/providers/" + provider.id, provider, {
            headers: {
                authorization: this.authToken
            }
        });
    }

    public static async Delete(providerID: number): Promise<void> {
        await axios.delete<ID>(baseURL + "/providers/" + providerID, {
            headers: {
                authorization: this.authToken
            }
        });
    }
}

export default Providers;