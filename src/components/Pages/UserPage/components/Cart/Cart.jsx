import {useState, useEffect} from 'react'
import axios from 'axios'
import CartItem from './components/CartItem'
import stylesCart from './Cart.module.scss'
import FormGroup from '@components/Common/FormGroup'
import PropTypes  from "prop-types";

function Cart() {
    const [cartItems, setCartItems] = useState([])
    const [orderActive, setOrderActive] = useState(false)
    const [orderData, setOrderData] = useState({
        address: "",
        city: "",
        code: ""
    })

    const fetchData = () => {
        const token = localStorage.getItem('token')
        axios.get("/api/cart", {headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                setCartItems(res.data)
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
                           onChange={() => setOrderData({address: orderData.address, ...orderData})}/>
                <FormGroup type="text" name="city" label="miasto" value={orderData.city}
                           onChange={() => setOrderData({city: orderData.city, ...orderData})}/>
                <FormGroup type="text" name="code" label="kod zniżkowy" value={orderData.code}
                           onChange={() => setOrderData({code: orderData.code, ...orderData})}/>
                <button className={stylesCart.orderBtn} onClick={() => {
                    setOrderActive(!orderActive)
                }}>Zamów
                </button>
            </form> :
            <button className={stylesCart.orderBtn} onClick={() => setOrderActive(!orderActive)}>Zamów</button>
        }
    </div>
}

export default Cart;