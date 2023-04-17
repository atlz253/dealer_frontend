import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import Header from "../components/Header";

const App = () => {
    return (
        <>
            <Header />
            <div className="d-flex">
                <SideNav />
                <Outlet />
            </div>
        </>
    );
}

export default App;