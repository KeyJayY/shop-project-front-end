import PropTypes from "prop-types";
import stylesCartItem from "./CartItem.module.scss"

function CartItem(props) {
    return <div className={stylesCartItem.cartItem}>
        <span>{props.productName}</span>
        <span className={stylesCartItem.amount}>{props.amount}</span>
        <span className={stylesCartItem.price}>{props.productPrice * props.amount}</span>
        <span className={stylesCartItem.remove} onClick={props.onClick} data-id={props.productId}>usuń</span>
    </div>
}

CartItem.propTypes = {
    productId: PropTypes.number,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CartItem;