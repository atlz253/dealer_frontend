import Products from "./Products";
import Contracts from "./Contracts";
import Login from "./Login";
import AbstractAPI from "./AbstractAPI";
import Users from "./Users";
import Bills from "./Bills";

class API extends AbstractAPI {
    public static SetAuthToken(token: string): void {
        super.SetAuthToken(token);

        Bills.SetAuthToken(token);
        Users.SetAuthToken(token);
        Login.SetAuthToken(token);
        Products.SetAuthToken(token);
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

    public static get Users(): typeof Users {
        return Users;
    }

    public static get Bills(): typeof Bills {
        return Bills;
    }
}

export default API;