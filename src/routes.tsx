import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Contracts from './pages/Contracts';
import Index from './pages/Index';
import Providers from './pages/Providers';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Bills from './pages/Bills';
import Contract from './pages/Contract';
import Product from "./pages/Product";

export const diler_routes: RouteObject[] = [
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
        element: <Contract />
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
        element: <Product newProduct />
    },
    {
        path: "/products/:productID",
        element: <Product />
    },
    {
        path: "/bills",
        element: <Bills />
    }
];

export const admin_routes: RouteObject[] = [
    {
        path: "/",
        element: <h1>Hello, admin!</h1>
    },
]