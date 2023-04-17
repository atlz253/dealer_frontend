import Products from "./Products";
import Contracts from "./Contracts";
import Login from "./Login";

class API {
    public static get Products(): typeof Products {
        return Products;
    }

    public static get Contracts(): typeof Contracts {
        return Contracts;
    }

    public static get Login(): typeof Login {
        return Login;
    }
}

export default API;