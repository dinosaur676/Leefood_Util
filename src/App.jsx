import './App.css'
import Aggregation from "./components/aggregation/Aggregation.jsx";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Body from "./components/aggregation/Body.jsx";
import Setting from "./components/aggregation/setting/Setting.jsx";
import Home from "./components/Home.jsx";

function App() {
    return (

        <BrowserRouter>
            <div style={{width: "100vw", height: "100vh", justifyContent: "center", display: "flex"}}>
                <div style={{width: "90%", height: "100vh", justifyContent: "center", display: "flex"}}>
                    <div className={"bordered-box"}
                         style={{display: "flex", flexDirection: "column",maxWidth: "100%", maxHeight: "100%", flexGrow: "1"}}>
                        <nav className="navbar">
                            <ul className="navbar-menu">
                                <li><Link to="/">홈</Link></li>
                                <li><Link to="/aggregation/">취합</Link></li>
                            </ul>
                        </nav>
                        <div style={{display: "flex", width: "100%", minHeight: "0", flexGrow: "1"}}>
                            <Routes>
                                <Route path={"/"} element={<Home/>}/>
                                <Route path={"/aggregation//*"} element={<Aggregation/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
