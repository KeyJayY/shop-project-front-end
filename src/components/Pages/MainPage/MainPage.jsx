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
            <div className={appStyle.container}>
            <Sidebar/>
                <main className={appStyle.main}>
                    <div className={appStyle.searchBar}>
                        <input type="text" placeholder="Wyszukaj produkty..."/>
                        <button>Szukaj</button>
                    </div>
                    <div className={appStyle.sortButtons}>
                        <button>Sortuj rosnąco</button>
                        <button>Sortuj malejąco</button>
                    </div>
                    <div className={appStyle.itemsContainer}>
                        {
                            products.map((product, index) => (<StoreItem key={product.product_id} product={product}/>))
                        }
                    </div>
                </main>
            </div>
        </>
    );
}

export default MainPage;
