import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";
import IAuth from "audio_diler_common/interfaces/IAuth";
import AbstractAPI from "./AbstractAPI";
import IAuthorization from "audio_diler_common/interfaces/IAuthorization";

class Login extends AbstractAPI {
    public static async Login(authorization: IAuthorization): Promise<IAuth> {
        const auth = await axios.post<IAuth>(baseURL + "/login", authorization);

        return auth.data;
    }
}

export default Login;