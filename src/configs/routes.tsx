import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Contracts from '../pages/Contracts';
import Index from '../pages/Index';
import Providers from '../pages/Providers';
import Clients from '../pages/Clients';
import Products from '../pages/Products';
import Bills from '../pages/BillsPage';
import ContractPage from '../pages/ContractPage';
import ProductPage from "../pages/ProductPage";
import Users from "../pages/Users";
import UserPage from "../pages/UserPage";
import BillPage from "../pages/BillPage";
import ClientPage from '../pages/ClientPage';

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
        path: "/contracts/new",
        element: <ContractPage newContract />
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
        path: "/clients/new",
        element: <ClientPage newClient />
    },
    {
        path: "/clients/:clientID",
        element: <ClientPage />
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
        element: <UserPage />
    },
    {
        path: "/users/new",
        element: <UserPage newUser />
    }
]