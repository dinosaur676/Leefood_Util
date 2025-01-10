import {useState} from "react";
import "../Basic.css"
import {RingLoader} from "react-spinners";
import Header from "./Header.jsx";
import axios from "axios";

const Body = () => {
    const [isWaiting, setIsWaiting] = useState(false)
    const [filePath, setFilePath] = useState("");

    const onChangeFilePath = (event) => {
        setFilePath(event.target.value)
    }
    const onClick = async () => {
        setIsWaiting(true);

        const url = import.meta.env.VITE_SERVER_URL + "api/aggregation";

        console.log(url);

        const params = {
            path: filePath
        }

        const response = await axios.post(url, params);

        console.log(response)

        setIsWaiting(false)
    }

    return (
        <div className={"div-column"} style={{
            flexGrow: "1",
            gap: "20px",
            margin: "10px"
        }}>
            <Header header={"취합"}/>
            <div className={"div-row"} style={{
                gap: "20px"
            }}>
                <label>파일 경로</label>
                <input type={"text"} value={filePath} onChange={onChangeFilePath} readOnly={isWaiting}
                       style={{
                           width: "400px",
                           textAlign: "center",
                           boxShadow: isWaiting ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none"
                       }}/>
                <input type={"button"} onClick={onClick} value={"취합"}/>

            </div>
            {isWaiting ? (
                <RingLoader color="#3498db" loading={isWaiting} size={50} /> // 원형 스피너
            ) : (
                <p>취합이 완료되었습니다.</p>
            )}
        </div>

    )
}

export default Body
