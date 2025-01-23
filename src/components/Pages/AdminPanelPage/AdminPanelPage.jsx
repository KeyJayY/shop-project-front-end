import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminPanelPage.module.scss';
import UsersList from './components/UsersList';
import ProductsList from './components/ProductsList';
import CodesList from './components/CodesList';
import AddAdminForm from './components/AddAdminForm';

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
                .get('/admin/check-token', { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => setAdminData(response.data))
                .catch(() => navigate('/admin/login'));
        }
    }, [navigate]);

    return (
        <div className={styles.adminPanel}>
            <header className={styles.header}>
                <h1>Admin Panel</h1>
            </header>
            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <button className={`${styles.button} ${chosenMenu === 0 && "clicked"}`}
                            onClick={() => setChosenMenu(0)}> Lista Produktów
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 1 && "clicked"}`}
                            onClick={() => setChosenMenu(1)}>Lista Użytkowników
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 2 && "clicked"}`}
                            onClick={() => setChosenMenu(2)}>Kody Promocyjne
                    </button>
                    <button className={`${styles.button} ${chosenMenu === 3 && "clicked"}`}
                            onClick={() => setChosenMenu(3)}>Dodaj Admina
                    </button>
                    <button className={styles.button} onClick={() => navigate('/admin/login')}>
                        Logout
                    </button>
                </aside>
                <main className={styles.mainContent}>
                    {chosenMenu === 0 && <ProductsList/>}
                    {chosenMenu === 1 && <UsersList/>}
                    {chosenMenu === 2 && <CodesList/>}
                    {chosenMenu === 3 && <AddAdminForm/>}
                </main>
            </div>
        </div>
    );
}

export default AdminPanelPage;
