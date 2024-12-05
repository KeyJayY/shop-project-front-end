import styleStoreItem from './StoreItem.module.scss';
import PropTypes from "prop-types";

function StoreItem(props) {
    console.log(props);
    return (
        <div className={styleStoreItem.storeItem}>
            <img alt={props.product.name} src="/test.png" className={styleStoreItem.itemImage} />
            <div className={styleStoreItem.nameBox}>{props.product.name}</div>
            <div className={styleStoreItem.priceBox}>{props.product.price}</div>
            <button className={styleStoreItem.buyButton}><a href={`/product/${props.product.product_id}`}>KUP</a></button>
        </div>
    )
}

StoreItem.propTypes = {
    product: PropTypes.shape({
        product_id: PropTypes.number.isRequired,
        name: PropTypes.string,
        price: PropTypes.string,
        description: PropTypes.string,
    })
}

export default StoreItem;