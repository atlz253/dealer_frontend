import Products from "./Products";
import Contracts from "./Contracts";
import Login from "./Login";
import AbstractAPI from "./AbstractAPI";
import DealerBills from "./DealerBills";
import Clients from "./Clients";
import Users from "./Users";
import Providers from "./Providers";
import Queries from "./Queries";
import axios from "axios";
import { baseURL } from "./APIconfig";
import tryServerRequest from "../utils/tryServerRequest";

class API extends AbstractAPI {
    public static SetAuthToken(token: string): void {
        super.SetAuthToken(token);

        DealerBills.SetAuthToken(token);
        Login.SetAuthToken(token);
        Users.SetAuthToken(token);
        Queries.SetAuthToken(token);
        Clients.SetAuthToken(token);
        Products.SetAuthToken(token);
        Providers.SetAuthToken(token);
        Contracts.SetAuthToken(token);
    }

    public static get Products(): typeof Products {
        return Products;
    }

    public static get Contracts(): typeof Contracts {
        return Contracts;
    }

    public static get Login(): typeof Login {
        return Login;
    }

    public static get DealerBills(): typeof DealerBills {
        return DealerBills;
    }

    public static get Clients(): typeof Clients {
        return Clients;
    }

    public static get Users(): typeof Users {
        return Users;
    }

    public static get Providers(): typeof Providers {
        return Providers;
    }

    public static get Queries(): typeof Queries {
        return Queries;
    }

    public static DownloadFile(url: string, fileName: string): void {
        axios({
            url: baseURL + url,
            method: "GET",
            responseType: "blob",
            headers: {
                authorization: this.authToken
            }
        }).then(response => {
            const href = URL.createObjectURL(response.data);
            
            const link = document.createElement('a');

            link.href = href;

            link.setAttribute("download", fileName);

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        }).catch(reason => alert("Не удалось получить файл"));
    }
}

export default API;