import Header from './Header.jsx';
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from 'axios';
import stylesProductPage from "./ProductPage.module.scss"

function ProductPage() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(async () => {
        setData((await axios.get(`/api/product/${id}`, {id})).data);
        setLoading(false);
    }, [])

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
                        <button>Dodaj do koszyka</button>
                    </div>
                </article>
                <div className={stylesProductPage.commentSection}></div>
            </main>
        </>
    )
}

export default ProductPage;