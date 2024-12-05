import Header from './Header.jsx';
import Sidebar from "./Sidebar.jsx";
import StoreItem from './StoreItem.jsx';
import appStyle from './MainPage.module.scss';
import {useAuth} from "./AuthProvider.jsx";
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
