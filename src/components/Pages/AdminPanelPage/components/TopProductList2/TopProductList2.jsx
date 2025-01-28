import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import styles from './TopProductList2.module.scss';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function TopProductsList2() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
    const [error, setError] = useState('');

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/getCategories', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCategories(['Wszystkie', ...response.data]);
            } catch (err) {
                console.error('Błąd podczas pobierania kategorii:', err);
                setError('Nie udało się pobrać kategorii.');
            }
        };

        fetchCategories();
    }, [token]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const endpoint =
                    selectedCategory === 'Wszystkie' || selectedCategory === ''
                        ? '/api/admin/getTopPopularProducts/all'
                        : `/api/admin/getTopPopularProducts/${encodeURIComponent(selectedCategory)}`;
                const response = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(response.data);
            } catch (err) {
                console.error('Błąd podczas pobierania produktów:', err);
                setError('Nie udało się pobrać produktów.');
            }
        };

        fetchProducts();
    }, [selectedCategory, token]);

    const topProducts = products.slice(0, 10);

    const chartData = {
        labels: topProducts.map((product) => product.product_name),
        datasets: [
            {
                label: 'Interakcje',
                data: topProducts.map((product) => product.total_views),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Nazwa Produktu',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Interakcje',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={styles.topProductsList}>
            <h2 className={styles.title}>Najpopularniejsze Produkty</h2>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.controls}>
                <label htmlFor="categorySelect">Filtruj według kategorii:</label>
                <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.categorySelect}
                >
                    {categories.map((category) => (
                        <option key={category.category} value={category.category}>
                            {category.category}
                        </option>
                    ))}
                </select>
            </div>
            {products.length > 0 && (
                <div className={styles.chartContainer}>
                    <h3>Interakcje według Produktu</h3>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID Produktu</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Ilość Interakcji</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.category}</td>
                            <td>{product.total_views}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className={styles.noData}>
                            Brak produktów.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default TopProductsList2;
