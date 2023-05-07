import axios from "axios";
import { baseURL } from "./APIconfig";
import AbstractAPI from "./AbstractAPI";
import ICheque from "audio_diler_common/interfaces/ICheque";

class Cheques extends AbstractAPI {
    public static async Save(contractID: number, cheque: ICheque): Promise<void> {
        await axios.put(baseURL + "/contracts/" + contractID + "/cheques/" + cheque.id, cheque, {
            headers: {
                authorization: this.authToken
            }
        });
    }
}

export default Cheques;