import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminPanelPage.module.scss';
import UsersList from './components/UsersList';
import ProductsList from './components/ProductsList';
import CodesList from './components/CodesList';
import AddAdminForm from './components/AddAdminForm';
import OrderList from './components/OrderList';
import SalesStatistics from './components/SalesStatistics';
import TopProductList from './components/TopProductList';
import TopProductList2 from './components/TopProductList2';

function AdminPanelPage() {
    const [adminData, setAdminData] = useState(null);
    const [chosenMenu, setChosenMenu] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        } else {
            axios
                .get('/auth/admin/check-token', { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    if (response.status === 200) {
                        setAdminData(response.data);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        navigate('/admin/login');
                    } else {
                        console.error('Błąd weryfikacji tokenu:', error);
                    }
                });
        }
    }, [navigate]);


    return (
        <div className={styles.adminPanel}>
            <header className={styles.header}>
                <h1>Admin Panel</h1>
            </header>
            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <button className={`${styles.button} ${chosenMenu === 0 && styles.clicked}`}
                            onClick={() => setChosenMenu(0)}> Lista Produktów
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 1 && styles.clicked}`}
                            onClick={() => setChosenMenu(1)}>Lista Użytkowników
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 2 && styles.clicked}`}
                            onClick={() => setChosenMenu(2)}>Kody Promocyjne
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 3 && styles.clicked}`}
                            onClick={() => setChosenMenu(3)}>Dodaj Admina
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 4 && styles.clicked}`}
                            onClick={() => setChosenMenu(4)}>Lista Zamówień
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 5 && styles.clicked}`}
                            onClick={() => setChosenMenu(5)}>Statystyki Sprzedaży
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 6 && styles.clicked}`}
                            onClick={() => setChosenMenu(6)}>Najczęściej sprzedawane produkty
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 7 && styles.clicked}`}
                            onClick={() => setChosenMenu(7)}>Najpopularniejsze produkty
                    </button>
                    <button className={styles.button} onClick={() => navigate('/admin/login')}>
                        Wyloguj
                    </button>
                </aside>
                <main className={styles.mainContent}>
                    {chosenMenu === 0 && <ProductsList/>}
                    {chosenMenu === 1 && <UsersList/>}
                    {chosenMenu === 2 && <CodesList/>}
                    {chosenMenu === 3 && <AddAdminForm/>}
                    {chosenMenu === 4 && <OrderList/>}
                    {chosenMenu === 5 && <SalesStatistics/>}
                    {chosenMenu === 6 && <TopProductList/>}
                    {chosenMenu === 7 && <TopProductList2/>}
                </main>
            </div>
        </div>
    );
}

export default AdminPanelPage;
