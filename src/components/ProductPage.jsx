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
            <main>
                <header className={stylesProductPage.productHeader}>
                    <h1>{data.name}</h1>
                    <h2>{data.category}</h2>
                </header>
                <article className={stylesProductPage.product}>
                    <img/>
                    <div>
                        <div>{data.price}</div>
                        <div>{data.description}</div>
                        <div className={stylesProductPage.amountCounter}>
                        <button onClick={() => {setAmount(Math.max(0, amount - 1))}}>&lt;</button>{amount}<button onClick={() => {setAmount(amount + 1)}}>&gt;</button>
                        </div>
                        <button onClick={addToCart}>Dodaj do koszyka</button>
                    </div>
                </article>
                <div className={stylesProductPage.commentSection}></div>
                <CommentsBox id={id}/>
            </main>
        </>
    )
}

export default ProductPage;