import Products from "./Products";
import Contracts from "./Contracts";
import Login from "./Login";
import AbstractAPI from "./AbstractAPI";
import DealerBills from "./DealerBills";
import Clients from "./Clients";
import Users from "./Users";
import Providers from "./Providers";

class API extends AbstractAPI {
    public static SetAuthToken(token: string): void {
        super.SetAuthToken(token);

        DealerBills.SetAuthToken(token);
        Login.SetAuthToken(token);
        Users.SetAuthToken(token);
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
}

export default API;