import Products from "./Products";
import Contracts from "./Contracts";

class API {
    public static get Products(): typeof Products {
        return Products;
    }

    public static get Contracts(): typeof Contracts {
        return Contracts;
    }
}

export default API;