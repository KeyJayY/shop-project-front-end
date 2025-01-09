import {useState, useEffect} from 'react'
import axios from 'axios'
import CartItem from './components/CartItem'
import stylesCart from './Cart.module.scss'
import FormGroup from '@components/Common/FormGroup'
import PropTypes  from "prop-types";

function Cart(props) {
    const [cartItems, setCartItems] = useState([])
    const [orderActive, setOrderActive] = useState(false)
    const [orderData, setOrderData] = useState({
        address: props.address,
        city: props.city,
        code: ""
    })

    const fetchData = () => {
        const token = localStorage.getItem('token')
        axios.get("/api/cart", {headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                setCartItems(res.data)
            })
    }

    const handleOrder = () => {
        const token = localStorage.getItem('token')
        axios.put("/api/order",  orderData, {headers: {Authorization: `Bearer ${token}`}}).then(res => {
            console.log(res)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const removeItem = async (e) => {
        const id = e.target.getAttribute('data-id')
        const token = localStorage.getItem('token')
        const response = await axios.delete(`/api/cart/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        if (response.status == 200) {
            fetchData();
        } else {
            console.log('error')
        }
    }

    return <div className={stylesCart.cart}>
        <h2>Koszyk</h2>
        {cartItems.map((item) => (
            <CartItem key={item.product_id} productName={item.name} productPrice={item.price}
                      amount={item.amount} productId={item.product_id} onClick={removeItem}/>))}
        {orderActive ?
            <form className={stylesCart.orderForm}>
                <FormGroup type="text" name="address" label="adres dostawy" value={orderData.address}
                           onChange={(e) => setOrderData({...orderData, address: e.target.value})}/>
                <FormGroup type="text" name="city" label="miasto" value={orderData.city}
                           onChange={(e) => setOrderData({...orderData, city: e.target.value})}/>
                <FormGroup type="text" name="code" label="kod zniżkowy" value={orderData.code}
                           onChange={(e) => setOrderData({...orderData, code: e.target.value})}/>
                <button className={stylesCart.orderBtn} onClick={handleOrder}>Zamów
                </button>
            </form> :
            cartItems.length !== 0 ? <button className={stylesCart.orderBtn} onClick={() => setOrderActive(!orderActive)}>Zamów</button> : <p>Koszyk jest pusty</p>
        }
    </div>
}

Cart.propTypes = {
    address: PropTypes.string,
    city: PropTypes.string,
}

export default Cart;