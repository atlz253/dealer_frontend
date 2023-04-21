import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";
import IAuth from "audio_diler_common/interfaces/IAuth";
import AbstractAPI from "./AbstractAPI";
import ILoginData from "audio_diler_common/interfaces/ILoginData";

class Login extends AbstractAPI {
    public static async Login(loginData: ILoginData): Promise<IAuth> {
        const auth = await axios.post<IAuth>(baseURL + "/login", loginData);

        return auth.data;
    }
}

export default Login;