import {useEffect, useState} from "react";
import Header from "../Header.jsx";
import {QRCodeCanvas} from 'qrcode.react';
import "./QRCode.css"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRDraw from "./QRDraw.jsx";
import axios from "axios";

const QRCodeGenerator = () => {
    const [inputValue, setInputValue] = useState("");
    const [historyList, setHistoryList] = useState([]);

    const url = import.meta.env.VITE_SERVER_URL + "api/qr";

    const onChangeInputText = (event) => {
        setInputValue(event.target.value);
    }

    const getURL = () => {
        return `https://mtrace.go.kr/mtracesearch/poultrySearch.do?searchNo=${inputValue}&appType=H`
    }

    const onOpenTabButton = () => {
        window.open(getURL(), "_blank");
    }

    const handleGeneratePDF = () => {
        const grid = document.getElementById('qr-grid');
        html2canvas(grid).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            // PDF 크기에 맞게 이미지 삽입
            const pdfWidth = 210; // A4 너비 (mm)
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // 비율 유지
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('qrcodes.pdf');
        });

        const params = {
            "pdNumber": inputValue
        }

        axios.put(url, params);
    };

    useEffect(() => {
        const init = async () => {
            const response = await axios.get(url);
            console.log(response)
            setHistoryList(response.data);
        }

        init();
    }, []);


    return(
        <div style={{
            maxWidth: "100%",
            display: "flex",
            flexGrow: "1",
            justifyContent: "start",
            flexDirection: "column",
            alignItems: "center",
            textAlign: 'center'
        }}>
            <Header header={"QR 코드 생성기"}></Header>
            <div style={{display: "flex", flexGrow: "1", width: "100%", flexDirection: "row", alignItems: "stretch", minHeight: "0", borderTop: "1px solid"}}>
                <div style={{
                    width: "20%",
                    display: "flex",
                    background: "red",
                    flexDirection: "column",
                    justifyContent: "start",
                    borderRight: "1px solid"
                }}>
                    <div className={"div-column"} style={{borderRight: "1px solid"}}>
                        {
                            historyList.map((item) => {
                                return (
                                    <label key={item.id}>{item["pd_number"]}</label>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{ display: "flex", flexGrow: "1", minHeight: "0", flexDirection: "column", minWidth: "0", maxWidth: "80%",
                    justifyContent: "start", alignItems:"center", background: "blue"}}>
                    <input
                        type="text"
                        placeholder="이력번호 입력"
                        value={inputValue}
                        onChange={onChangeInputText}
                        style={{
                            padding: '10px',
                            marginTop: "10px",
                            width: '300px',
                            marginBottom: '20px',
                            fontSize: '16px',
                        }}
                    />
                    <button className={"styled-button"} onClick={onOpenTabButton}>
                        사이트 접속
                    </button>
                    <button className={"styled-button"} style={{marginTop: "20px"}} onClick={handleGeneratePDF}>
                        pdf 파일 출력
                    </button>
                    <div style={{margin: '20px', maxWidth: "90%", overflow: "scroll"}}>
                        {inputValue && (
                            <QRDraw url={getURL()} num={inputValue}/>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}


export default QRCodeGenerator