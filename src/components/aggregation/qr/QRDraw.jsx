import {QRCodeCanvas} from "qrcode.react";

const QRDraw = ({url, num}) => {

    const count = Array.from({length: 30}, (_, i) => i + 1);

    return (
        <div
            id="qr-grid"
            style={{
                display: "flex",
                width: "2480px",
                height: "3508px",
                maxWidth: "2480px",
                maxHeight: "3508px",
            }}
        >
            <div style={{
                flexGrow: "1",
                maxHeight: "100%",
                paddingLeft: "170px",
                paddingRight: "130px",
                paddingTop: "130px",
                paddingBottom: "190px",
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                columnGap: '30px',
                rowGap:"0px",
                backgroundColor: 'white'
            }}>
                {count.map((value, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px',
                        }}
                    >
                        <QRCodeCanvas
                            value={url} // QR 코드로 변환할 값
                            size={256} // QR 코드 크기 (픽셀)
                            bgColor="#ffffff" // 배경색
                            fgColor="#000000" // QR 코드 색상
                            level="H" // 오류 보정 수준 (L, M, Q, H)
                        />
                        <label style={{color: "black", paddingTop: "20px", fontSize: "28px"}}>이력번호</label>
                        <label style={{color: "black", fontSize: "28px"}}>{num}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QRDraw