import IBaseBill from "audio_diler_common/interfaces/IBaseBill";
import AbstractAPI from "./AbstractAPI";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IBill from "audio_diler_common/interfaces/IBill";
import ID from "audio_diler_common/interfaces/ID";
import IBillNumber from "audio_diler_common/interfaces/IBillNumber";

class Bills extends AbstractAPI {
    public static async Get(onlyBillNumbers?: boolean): Promise<IBaseBill[] | IBillNumber[]> {
        const request = await axios.get<IBaseBill[]>(baseURL + "/bills", {
            headers: {
                authorization: this.authToken
            },
            params: {
                onlyBillNumbers
            }
        });

        return request.data;
    }

    public static async GetByID(id: number): Promise<IBill> {
        const request = await axios.get<IBill>(baseURL + "/bills/" + id, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Create(bill: IBill): Promise<ID> {
        const request = await axios.post<ID>(baseURL + "/bills/new", bill, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Save(bill: IBill): Promise<void> {
        await axios.put<ID>(baseURL + "/bills/" + bill.id, bill, {
            headers: {
                authorization: this.authToken
            }
        });
    }

    public static async Delete(id: number): Promise<void> {
        await axios.delete<ID>(baseURL + "/bills/" + id, {
            headers: {
                authorization: this.authToken
            }
        });
    }
}

export default Bills;