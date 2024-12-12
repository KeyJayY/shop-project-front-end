import {useState, useEffect} from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import stylesCart from './Cart.module.scss'

function Cart() {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get("/api/cart", {headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                console.log(res.data)
                setCartItems(res.data)
        })
    }, [])

    return <div className={stylesCart.cart}>
        <h2>Koszyk</h2>
        {cartItems.map((item) => (
            <CartItem key={item.product_id} productName={item.name} productPrice={item.price}
                      amount={item.amount}/>))}
        <button className={stylesCart.orderBtn}>Zamów</button>
    </div>
}

export default Cart;