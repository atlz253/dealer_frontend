import IBaseUser from "audio_diler_common/interfaces/IBaseUser";
import AbstractAPI from "./AbstractAPI";
import axios from "axios";
import { baseURL } from "./APIconfig";
import IUser from "audio_diler_common/interfaces/IUser";
import ID from "audio_diler_common/interfaces/ID";

class Users extends AbstractAPI {
    public static async Get(): Promise<IBaseUser[]> {
        const request = await axios.get<IBaseUser[]>(baseURL + "/users", {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async GetByID(id: number): Promise<IUser> {
        const request = await axios.get<IUser>(baseURL + "/users/" + id, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Create(user: IUser): Promise<ID> {
        const request = await axios.post<IUser>(baseURL + "/users/new", user, {
            headers: {
                authorization: this.authToken
            }
        });

        return request.data;
    }

    public static async Save(user: IUser): Promise<void> {
        await axios.put(baseURL + "/users/" + user.id, user, {
            headers: {
                authorization: this.authToken
            }
        });
    }

    public static async Delete(id: number): Promise<void> {
        await axios.delete(baseURL + "/users/" + id, {
            headers: {
                authorization: this.authToken
            }
        });
    }
}

export default Users;