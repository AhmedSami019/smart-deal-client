import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";


const HomeLayout = () => {
    return (
        <div>
            <header>
                {/* this is navbar section */}
                <nav>
                    <Navbar></Navbar>
                </nav>
            </header>

            {/* this is main body section */}
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default HomeLayout;