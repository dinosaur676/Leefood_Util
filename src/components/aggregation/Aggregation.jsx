import Body from "./Body.jsx";
import "../Basic.css"
import "../../App.css"
import {Link, Route, Routes} from "react-router-dom";
import Setting from "./setting/Setting.jsx";
import QRCodeGenerator from "./qr/QRCode.jsx";

const Aggregation = () => {
    return (
        <div style={{display: "flex", width: "100%", flexDirection: "column", flexGrow: "1", paddingTop: "5px"}}>
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li><Link to="/aggregation/">취합</Link></li>
                    <li><Link to="/aggregation/setting/">취합 설정</Link></li>
                    <li><Link to="/aggregation/qr/">QR 생성</Link></li>
                </ul>
            </nav>
            <div style={{display: "flex", width: "100%", minHeight: "0", flexGrow: "1"}}>
                <Routes>
                    <Route path={"/"} element={<Body/>}/>
                    <Route path={"/setting/"} element={<Setting/>}/>
                    <Route path={"/qr/"} element={<QRCodeGenerator/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Aggregation;