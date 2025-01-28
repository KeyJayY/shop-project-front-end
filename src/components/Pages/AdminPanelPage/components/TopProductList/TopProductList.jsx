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
import styles from './TopProductList.module.scss';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function TopProductsList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
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
                        ? '/api/admin/getTopProducts/all'
                        : `/api/admin/getTopProducts/${encodeURIComponent(selectedCategory)}`;
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
                label: 'Sprzedana ilość produktów',
                data: topProducts.map((product) => product.total_quantity_sold),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                    text: 'Produkt',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sprzedana ilość',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={styles.topProductsList}>
            <h2 className={styles.title}>Najczęściej Kupowane Produkty</h2>
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
            {topProducts.length > 0 && (
                <div className={styles.chartContainer}>
                    <h3>Dane Sprzedaży (Top 10 Produktów)</h3>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID Produktu</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Ilość</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.category}</td>
                            <td>{product.total_quantity_sold}</td>
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

export default TopProductsList;
