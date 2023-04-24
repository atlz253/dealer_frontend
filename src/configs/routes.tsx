import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Contracts from '../pages/Contracts';
import Index from '../pages/Index';
import Providers from '../pages/Providers';
import Clients from '../pages/Clients';
import Products from '../pages/Products';
import Bills from '../pages/Bills';
import ContractPage from '../pages/ContractPage';
import ProductPage from "../pages/ProductPage";
import Users from "../pages/Users";
import User from "../pages/User";
import BillPage from "../pages/BillPage";

export const dealer_routes: RouteObject[] = [
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/contracts",
        element: <Contracts />
    },
    {
        path: "/contracts/:contractID",
        element: <ContractPage />
    },
    {
        path: "/providers",
        element: <Providers />
    },
    {
        path: "/clients",
        element: <Clients />
    },
    {
        path: "/products",
        element: <Products />
    },
    {
        path: "/products/new",
        element: <ProductPage newProduct />
    },
    {
        path: "/products/:productID",
        element: <ProductPage />
    },
    {
        path: "/bills",
        element: <Bills />
    },
    {
        path: "/bills/:billID",
        element: <BillPage />
    },
    {
        path: "/bills/new",
        element: <BillPage newBill />
    }
];

export const admin_routes: RouteObject[] = [
    {
        path: "/",
        element: <Index />
    },
    {
        path: "/users",
        element: <Users />
    },
    {
        path: "/users/:userID",
        element: <User />
    },
    {
        path: "/users/new",
        element: <User newUser />
    }
]