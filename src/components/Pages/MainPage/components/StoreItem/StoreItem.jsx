import styleStoreItem from './StoreItem.module.scss';
import PropTypes from "prop-types";

function StoreItem(props) {
    return (
        <div className={styleStoreItem.storeItem}>
            <img alt={props.product.name} src="https://via.placeholder.com/200" />
            <h3 className={styleStoreItem.productTitle}>{props.product.name}</h3>
            <p className={styleStoreItem.productPrice}>{props.product.price}</p>
            <a href={`/product/${props.product.product_id}`}>
                <button className={styleStoreItem.productButton}>KUP
            </button>
            </a>
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