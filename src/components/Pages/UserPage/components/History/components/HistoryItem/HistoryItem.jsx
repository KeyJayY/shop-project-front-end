import stylesHistoryItem from "./HistoryItem.module.scss"
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";

function HistoryItem(props){
    const [isExpanded, setIsExpanded] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(!isExpanded) return;
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/user/getOrderDetails/${props.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching order history", error);
            }
        };
        setIsLoading(true);
        fetchData();
        setIsLoading(false);
    }, [isExpanded]);

    const date = new Date(props.date);

    const formattedDate = date.toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return <div className={stylesHistoryItem.historyItem}>
        <div className={stylesHistoryItem.main}>
            <div>
                <p><strong>Data: </strong>{formattedDate}</p>
                <p><strong>Kwota: </strong>{(props.price / 100).toFixed(2)} zł</p>
                <p><strong>Status: </strong>{props.status}</p>
                <p><strong>Zniżka: </strong>{props.code ? props.code : 0}%</p>
            </div>
            <button onClick={() => setIsExpanded(!isExpanded)}>{!isExpanded ? "rozwiń" : "zwiń"}</button>
        </div>

            {isExpanded && (
                <div className={stylesHistoryItem.details}>
                    <p>Produkty w zamówieniu:</p>
                    <div className={stylesHistoryItem.detailItem} ><p>nazwa</p><p>ilość</p></div>
                    {isLoading ? <div>loading</div> : data.map((item) => <div className={stylesHistoryItem.detailItem}
                                                                              key={item.product_id}>
                        <p>{item.product_name}</p> <p>{item.product_amount}</p></div>)}
                </div>
            )}
    </div>
}

HistoryItem.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.number,
    code: PropTypes.string,
    products: PropTypes.array,
}

export default HistoryItem;