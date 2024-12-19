import Header from './Header.jsx';
import CommentsBox from './CommentsBox';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';
import stylesProductPage from "./ProductPage.module.scss"

function ProductPage() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(1);
    const { id } = useParams();

    useEffect( () => {
        const fetchData = async () => {
            try{
                setData((await axios.get(`/api/product/${id}`, {id})).data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    const addToCart = async () => {
        const token = localStorage.getItem("token");
        await axios.post("/api/addToCart", {productId: id, amount},{
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }).then(response => {
            console.log(response);
        })
    }

    if(loading)
        return <>loading...</>;


    return (
        <>
        <Header />
            <main className={stylesProductPage.productContainer}>
                <header className={stylesProductPage.productHeader}>
                    <img src={"https://via.placeholder.com/200"} alt={"zdjecie produktu"}/>
                    <div className={stylesProductPage.productDetails}>
                        <h1>{data.name}</h1>
                        <div className={stylesProductPage.category}>
                            {data.category}
                        </div>
                        <div className={stylesProductPage.price}>{data.price}</div>
                        <div className={stylesProductPage.description}>{data.description}</div>
                        <span>{data.grade}/5</span>
                        <div className={stylesProductPage.quantityControls}>
                            <button onClick={() => {setAmount(Math.max(1, amount-1))}}>-</button>
                            <input type="text" className={stylesProductPage.quantity} value={amount} readOnly/>
                            <button onClick={() => {setAmount(Math.min(amount+1, 999))}}>+</button>
                        </div>
                        <button className={stylesProductPage.addToCart} onClick={addToCart}>Dodaj do koszyka</button>
                    </div>
                </header>
                <CommentsBox id={id}/>
            </main>
        </>
    )
}

export default ProductPage;