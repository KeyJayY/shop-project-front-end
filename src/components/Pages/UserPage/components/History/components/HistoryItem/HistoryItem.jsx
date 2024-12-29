import stylesHistoryItem from "./HistoryItem.module.scss"
import PropTypes from "prop-types";

function HistoryItem(props){

    const date = new Date(props.date);

    const formattedDate = date.toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return <div className={stylesHistoryItem.historyItem}>
        <p><strong>Data: </strong>{formattedDate}</p>
        <p><strong>Kwota: </strong>{props.price}</p>
        <p><strong>Status: </strong>{props.status}</p>
        <p><strong>Kod: </strong>{props.code}</p>
    </div>
}

HistoryItem.propTypes = {
    date: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.number,
    code: PropTypes.string,
    products: PropTypes.array,
}

export default HistoryItem;