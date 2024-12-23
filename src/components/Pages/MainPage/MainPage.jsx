import Header from '@components/Layout/Header';
import Sidebar from "@components/Layout/Sidebar";
import StoreItem from './components/StoreItem';
import appStyle from './MainPage.module.scss';
import {useState, useEffect} from "react";

function MainPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState("");
    const [category, setCategory] = useState("");

    const fetchData = (search = "", sorting = "", category = "") => {
        fetch(`/api/getShopItems?search=${search}&sorting=${sorting}&category=${encodeURIComponent(category)}`)
            .then((response) => response.json())
            .then((result) => {
                setProducts(result);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const onClickCategory = (e) => {
        fetchData(search, sorting, e.target.innerText);
        setCategory(e.target.innerText);
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (<>
        <Header/>
        <div className={appStyle.container}>
            <Sidebar onClick={onClickCategory} chosenCategory={category} />
            <main className={appStyle.main}>
                <div className={appStyle.searchBar}>
                    <input type="text" value={search} placeholder="Wyszukaj produkty..."
                           onChange={(e) => {
                               setSearch(e.target.value);
                               fetchData(e.target.value, sorting, category);
                           }}/>
                    <button onClick={() => {
                        fetchData(search)
                    }}>Szukaj
                    </button>
                </div>
                <div className={appStyle.sortButtons}>
                    <p>Sortuj ceny:</p>
                    <button className={sorting === "asc" ? appStyle.clicked : null}
                            onClick={() => {
                                setSorting(sorting === "asc" ? "" : "asc")
                                fetchData(search, sorting === "asc" ? "" : "asc", category)
                            }}>rosnąco
                    </button>
                    <button className={sorting === "desc" ? appStyle.clicked : null}
                            onClick={() => {
                                setSorting(sorting === "desc" ? "" : "desc")
                                fetchData(search, sorting === "desc" ? "" : "desc", category)
                            }}>malejąco
                    </button>
                </div>
                <div className={appStyle.itemsContainer}>
                    {products.map((product, index) => (<StoreItem key={product.product_id} product={product}/>))}
                </div>
            </main>
        </div>
    </>);
}

export default MainPage;
