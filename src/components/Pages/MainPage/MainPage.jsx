import Header from '@components/Layout/Header';
import Sidebar from "@components/Layout/Sidebar";
import StoreItem from './components/StoreItem';
import appStyle from './MainPage.module.scss';
import {useAuth} from "@src/AuthProvider.jsx";
import {useState, useEffect} from "react";

function MainPage() {
    const {isAuthenticated, logout} = useAuth();
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('/api/getShopItems')
            .then((response) => response.json())
            .then((result) => {
                setProducts(result);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <>
            <Header/>
            <main className={appStyle.main}>
                <Sidebar/>
                <div className={appStyle.itemsContainer}>
                    {
                        products.map((product, index) => (<StoreItem key={product.product_id} product={product}/>))
                    }
                </div>
            </main>
        </>
    );
}

export default MainPage;
