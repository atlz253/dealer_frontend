import IBaseBill from "audio_diler_common/interfaces/IBaseBill";
import IBill from "audio_diler_common/interfaces/IBill";
import IBillNumber from "audio_diler_common/interfaces/IBillNumber";
import ID from "audio_diler_common/interfaces/ID";
import axios from "axios";
import { baseURL } from "./APIconfig";
import AbstractAPI from "./AbstractAPI";

class ProviderBills extends AbstractAPI {
    public static async Get(providerID: number, onlyBillNumbers?: boolean): Promise<IBaseBill[] | IBillNumber[]> {
        const request = await axios.get<IBaseBill[]>(baseURL + "/providers/" + providerID + "/bills", {
            headers: {
                authorization: this.authToken
            },
            params: {
                onlyBillNumbers
            }
        });

        return request.data;
    }

    public static async GetByID(providerID: number, billID: number): Promise<IBill> {
        const request = await axios.get<IBill>(baseURL + "/providers/" + providerID + "/bills/" + billID, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Create(providerID: number, bill: IBill): Promise<ID> {
        const request = await axios.post<ID>(baseURL + "/providers/" + providerID + "/bills/new", bill, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Delete(providerID: number, billID: number): Promise<void> {
        await axios.delete(baseURL + "/providers/" + providerID + "/bills/" + billID, {
            headers: {
                authorization: this.authToken
            }
        });
    }

    public static async Save(providerID: number, bill: IBill): Promise<void> {
        await axios.put(baseURL + "/providers/" + providerID + "/bills/" + bill.id, bill, {
            headers: {
                authorization: this.authToken
            }
        });
    }
}

export default ProviderBills;