import "./DataInput.css"

// eslint-disable-next-line react/prop-types
const DataInput = ({type, inputData, dataInputHandler}) => {
    const labelList_A = ["파일 명", "id", "주문번호", "받는사람", "전화번호1", "전화번호2", "우편번호", "주소", "상품명1", "상품상세1", "수량(A타입)", "배송메시지", "운임구분", "운임", "운송장번호"]
    const labelList_B = ["파일 명", "id", "주문번호", "보내는사람(지정)", "전화번호1(지정)", "전화번호2(지정)", "우편번호(지정)", "주소(지정)", "받는사람", "전화번호1", "전화번호2", "우편번호", "주소",
        "상품명1", "상품상세1", "수량(A타입)", "배송메시지", "운임구분", "운임", "운송장번호"]
    const labelList_C = ["파일 명", "id", "주문번호","받는사람","전화번호1","전화번호2","우편번호","주소","수량(A타입)","배송메시지","운임구분","운임","운송장번호","상품코드1",
        "상품명1","상품상세1","상품코드2","상품명2","상품상세2","상품코드3","상품명3","상품상세3","상품코드4","상품명4","상품상세4","상품코드5","상품명5","상품상세5"]

    const getLabelListByType = () => {
        switch (type) {
            case "A":
                return labelList_A;
            case "B":
                return labelList_B;
            case "C":
                return labelList_C;
        }
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        }}>
            {
                getLabelListByType().map((item) => {
                    return <InputLabel key={item} itemKey={item} label={item} value={inputData[item] == null ? "" : inputData[item]}
                                       dataInputHandler={dataInputHandler}/>
                })
            }
        </div>
    )
}

// eslint-disable-next-line react/prop-types
const InputLabel = ({itemKey, label, value, dataInputHandler}) => {
    return (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
            <label style={{flex: "1"}} className={"label"}>{label}</label>
            <input style={{flex: "3", boxShadow: itemKey === "id" ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none"}} type={"text"} value={value} readOnly={itemKey === "id"} onChange={(event) => dataInputHandler(itemKey, event)}/>
            <div style={{flex: "1"}}/>
        </div>
    )
}
export default DataInput;