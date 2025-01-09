import {useState, useEffect} from "react";
import stylesHistory from "./Histroy.module.scss"
import axios from "axios";
import HistoryItem from "./components/HistoryItem";

function History(){
    const [history, setHistory] = useState([])

    const fetchData = async () => {
        const token = localStorage.getItem('token')
        axios.get("/api/getOrderHistory", {
            headers: {
                Authorization: `Bearer ${token}`
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
        {history.map((item) => <HistoryItem key={item.order_id} id={item.order_id} date={item.date} status={item.status} price={item.price} code={item.discount_percent}/>)}
    </div>
}

export default History;