import {useState, useEffect} from 'react'
import axios from 'axios'
import CartItem from './components/CartItem'
import stylesCart from './Cart.module.scss'
import FormGroup from '@components/Common/FormGroup'
import PropTypes  from "prop-types";
import {useAlert} from "@src/AlertContext.jsx"

function Cart(props) {
    const [cartItems, setCartItems] = useState([])
    const [orderActive, setOrderActive] = useState(false)
    const [orderData, setOrderData] = useState({
        address: props.address,
        city: props.city,
        code: ""
    })
    const [correctCode, setCorrectCode] = useState(false)

    const {showAlert} = useAlert();

    const fetchData = () => {
        const token = localStorage.getItem('token')
        axios.get("/api/user/cart", {headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                setCartItems(res.data)
            })
    }

    const handleOrder = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if(!correctCode) orderData.code = null;
        try{
            await axios.put("/api/user/order",  orderData, {headers: {Authorization: `Bearer ${token}`}})
            showAlert("dodano zamówienie" ,"success");
            setOrderActive(false);
            setCartItems([]);
            if(props.onCartAction) props.onCartAction()
            fetchData();
        }catch (error){
            console.log(error)
            showAlert("nie udało się dodać zamówienia.", "error");
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const removeItem = async (e) => {
        const token = localStorage.getItem('token')
        const id = e.target.getAttribute('data-id')
        const response = await axios.delete(`/api/user/cart/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        if (response.status == 200) {
            fetchData();
        } else {
            console.log('error')
        }
    }

    const checkCode = async (code) => {
        const token = localStorage.getItem('token')
        const res = await axios.get(`/api/user/checkCode?code=${code}`, {headers: {Authorization: `Bearer ${token}`}})
        res.data.message === "correct" ? setCorrectCode(true) : setCorrectCode(false);
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
                           onChange={(e) => {
                               setOrderData({...orderData, code: e.target.value})
                               console.log(e.target.value)
                               checkCode(e.target.value);
                           }
                }/>
                {correctCode ? "Poprawny kod" : "Niepoprawny kod"}
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
    onCartAction: PropTypes.func,
}

export default Cart;