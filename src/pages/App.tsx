import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { useState } from "react";

const App = () => {
    const [sideNavShow, setSideNavShow] = useState<boolean>(false);

    return (
        <>
            <Header 
                onBurgerMenuClick={() => setSideNavShow(!sideNavShow)}
            />
            <div className="d-flex">
                <SideNav
                    isShow={sideNavShow}
                    setIsShow={setSideNavShow}
                />
                <Outlet />
            </div>
        </>
    );
}

export default App;