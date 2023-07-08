import { Outlet } from "react-router-dom";
import Header from "./component/layout/Header";

function App() {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
}

export default App;
