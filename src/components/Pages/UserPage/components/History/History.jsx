import {useState, useEffect} from "react";
import stylesHistory from "./Histroy.module.scss"
import axios from "axios";
import HistoryItem from "./components/HistoryItem";

function History(){
    const [history, setHistory] = useState([])

    const fetchData = async () => {
        axios.get("/api/getOrderHistory", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setHistory(res.data);
        })
    }

    useEffect(()=>{
        fetchData()
    }, [])

    return <div className={stylesHistory.orderHistory}>
        <h2>Historia zamówień</h2>
        {history.map((item) => {<HistoryItem/>})}
    </div>
}

export default History;