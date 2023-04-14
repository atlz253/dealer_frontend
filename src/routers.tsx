import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Contracts from './pages/Contracts';
import Index from './pages/Index';
import Providers from './pages/Providers';
import Clients from './pages/Clients';
import Products from './pages/Products';
import Bills from './pages/Bills';
 
export const diler_router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Index />
            },
            {
                path: "/contracts",
                element: <Contracts />
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
                path: "/bills",
                element: <Bills />
            }
        ]
    }
]);