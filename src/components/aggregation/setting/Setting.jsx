import "../../Basic.css"
import "./Setting.css"
import {useEffect, useState} from "react";
import DataInput from "./DataInput.jsx";
import axios from "axios";

const Setting = () => {
    const [selectedType, setSelectedType] = useState("A")
    const [inputData, setInputData] = useState({})
    const [fileList, setFileList] = useState([])
    const typeList = ["A-Type(일반)", "B-Type(지정송하인)", "C-Type(품명다수)"];

    const url = import.meta.env.VITE_SERVER_URL + "api/aggregation/setting"


    useEffect(() => {
        const init = async () => {
            setFileList(await getAggregationList());
            setInputData({});
        }

        init();
    }, [selectedType]);

    const dropDownChangeEvent = (event) => {
        setSelectedType(event.target.value)
    }

    const inputDataHandler = (key, event) => {
        setInputData((prevState) => ({
            ...prevState,
            [key]: event.target.value
        }));
    }

    const getAggregationList = async () => {
        const params = {
            type: selectedType
        }

        const response = await axios.get(url, {
            params: params
        })

        return response.data
    }

    const onInsertInputDataButton = async () => {
        const params = inputData;
        params["type"] = selectedType
        const response = await axios.put(url, params);

        if(response.status === 200)
        {
            setFileList(await getAggregationList());
            clearInputData();
            alert(`추가가 완료되었습니다.`)
        }
    }

    const onUpdateInputDataButton = async () => {
        const params = inputData;
        params["type"] = selectedType
        const response = await axios.post(url, params);

        if(response.status === 200)
        {
            setFileList(await getAggregationList());
            alert(`수정이 완료되었습니다.`)
        }
    }

    const onDeleteInputDataButton = async () => {
        if(inputData.id == null) {
            alert("선택된 데이터가 없습니다.")
            return;
        }

        const params = {
            type: selectedType,
            id: inputData.id
        };

        const response = await axios.delete(url, {params : params});

        if(response.status === 200)
        {
            alert(`${inputData["파일 명"]} 삭제가 완료되었습니다.`)
            setFileList(await getAggregationList());
            clearInputData();
        }
    }

    const onResetInputDataButton = async () => {
        clearInputData()
    }

    const onListitemButton = (item) => {
        setInputData(item);
    }

    const clearInputData = () => {
        setInputData({})
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flexGrow: "1",
            minHeight: "0"
        }}>
            <header>
                <h2>취합 설정</h2>
            </header>
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flexGrow: "1",
                minHeight: "0",
                borderTop: "1px solid",
            }}>
                <div className={"div-column"} style={{borderRight: "1px solid", flexGrow: "1"}}>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: 'start',
                        paddingTop: "10px",
                        paddingRight: "10px",
                        minHeight: "0"
                    }}>
                        <select value={selectedType} onChange={dropDownChangeEvent}
                                style={{padding: '6px', fontSize: '14px'}}>
                            {
                                typeList.map((item) => {
                                    return <option key={item} value={item.at(0)}>{item}</option>
                                })
                            }
                        </select>
                        <div style={{display: "flex", flexDirection: "column", gap: "5px", width: "100%", justifyContent: "start",
                            alignItems: "stretch", flexGrow: "1", paddingTop: "5px", overflow: "auto", minHeight: "0"}}>
                            {
                                fileList.map((item) => {
                                    return (
                                        <button key={item.id} className={"list-item-button"} style={{flexGrow: "1"}} onClick={() => onListitemButton(item)}>{item["파일 명"]}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div style={{
                    borderLeft: "1px solid",
                    flexGrow: "2",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    minHeight: "0"
                }}>
                    <div style={{width: "70%", overflow: "auto", minHeight: "0", padding: "10px"}}>
                        <DataInput dataInputHandler={inputDataHandler} type={selectedType} inputData={inputData}/>
                    </div>
                    <div style={{width: "90%", borderTop: "1px solid", gap: "10px"}}>
                        <button className={"button-reset"} onClick={onResetInputDataButton}>리셋</button>
                        <button className={"button-remove"} onClick={onDeleteInputDataButton}>삭제</button>
                        <button className={"button-normal"} onClick={onUpdateInputDataButton}>수정</button>
                        <button className={"button-normal"} onClick={onInsertInputDataButton}>추가</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Setting;