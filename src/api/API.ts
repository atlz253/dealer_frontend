import Products from "./Products";
import Contracts from "./Contracts";
import Login from "./Login";
import AbstractAPI from "./AbstractAPI";
import Users from "./Users";

class API extends AbstractAPI {
    public static SetAuthToken(token: string): void {
        super.SetAuthToken(token);

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
}

export default API;