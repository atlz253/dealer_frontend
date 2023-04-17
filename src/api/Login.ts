import IBaseUser from "audio_diler_common/interfaces/IBaseUser";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IResponse from "audio_diler_common/interfaces/IResponse";
import IAuth from "audio_diler_common/interfaces/IAuth";

class Login {
    public static async Login(user: IBaseUser): Promise<IResponse<IAuth> | null> {
        try {
            const auth = await axios.post<IResponse<IAuth>>(baseURL + "/login", user);

            return auth.data;
        } catch (e) {
            console.error(e);
            
            return null;
        }
    }
}

export default Login;