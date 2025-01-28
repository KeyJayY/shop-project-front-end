import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import styles from './SalesStatistics.module.scss';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function SalesStatistics() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [interval, setInterval] = useState('day');
    const [statistics, setStatistics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('adminToken');

    const fetchStatistics = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                '/api/admin/getSalesStatistics',
                {
                    start_date: startDate,
                    end_date: endDate,
                    interval: interval,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStatistics(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania statystyk sprzedaży:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchStatistics();
    };

    const chartData = {
        labels: statistics.map((stat) => stat.period),
        datasets: [
            {
                label: 'Przychody',
                data: statistics.map((stat) => (stat.total_sales_with_discount / 100).toFixed(2)),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
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
                    text: 'Okres',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Przychód',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={styles.salesStatistics}>
            <h2 className={styles.title}>Statystyki Sprzedaży</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="startDate">Data początkowa:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="endDate">Data końcowa:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="interval">Interwał:</label>
                    <select
                        id="interval"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                    >
                        <option value="day">Dzień</option>
                        <option value="week">Tydzień</option>
                        <option value="month">Miesiąc</option>
                        <option value="year">Rok</option>
                    </select>
                </div>
                <button className={styles.submitButton} type="submit">
                    Pobierz statystyki
                </button>
            </form>
            {isLoading ? (
                <p className={styles.loading}>Ładowanie...</p>
            ) : (
                <>
                    {statistics.length > 0 && (
                        <div className={styles.chartContainer}>
                            <h3>Przychód</h3>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    )}
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Okres</th>
                            <th>Przychód</th>
                        </tr>
                        </thead>
                        <tbody>
                        {statistics.length > 0 ? (
                            statistics.map((stat, index) => (
                                <tr key={index}>
                                    <td>{stat.period}</td>
                                    <td>{(Math.floor(stat.total_sales_with_discount) / 100).toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className={styles.noData}>
                                    Brak danych dla wybranego zakresu.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default SalesStatistics;
