import styleStoreItem from './StoreItem.module.scss';
import PropTypes from "prop-types";
import { useAlert } from '@src/AlertContext.jsx';

function StoreItem(props) {
    const { showAlert } = useAlert(props);

    return (
        <div className={styleStoreItem.storeItem}>
            <img alt={props.product.name} src={`/image/${props.product.product_id}`} />
            <h3 className={styleStoreItem.productTitle}>{props.product.name}</h3>
            <p className={styleStoreItem.productPrice} onClick={() => {showAlert("test")}}>{props.product.price / 100} zł</p>
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