import Header from '@components/Layout/Header';
import CommentsBox from './components/CommentsBox';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';
import stylesProductPage from "./ProductPage.module.scss"
import {useAlert} from "@src/AlertContext.jsx"

function ProductPage() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(1);
    const { id } = useParams();
    const {showAlert} = useAlert();

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


        try{
            const response =await axios.post("/api/user/addToCart", {productId: id, amount},{
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            })
            if(response.status == 200)
                showAlert("Dodano do koszyka!", "success");

        } catch (error) {
            showAlert("Produkt jest już w koszyku.", "error");
        }
    }

    if(loading)
        return <>loading...</>;


    return (
        <>
        <Header />
            <main className={stylesProductPage.productContainer}>
                <header className={stylesProductPage.productHeader}>
                    <img src={`/image/${id}`} alt={"zdjecie produktu"}/>
                    <div className={stylesProductPage.productDetails}>
                        <h1>{data.name}</h1>
                        <div className={stylesProductPage.category}>
                            {data.category}
                        </div>
                        <div className={stylesProductPage.price}>{data.price / 100} zł</div>
                        <div className={stylesProductPage.description}>{data.description}</div>
                        <div className={stylesProductPage.grade}>Ocena: {parseFloat(data.average_grade).toFixed(2)}/5</div>
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