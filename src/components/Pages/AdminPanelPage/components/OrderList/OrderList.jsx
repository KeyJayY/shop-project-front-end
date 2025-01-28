import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderList.module.scss';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [details, setDetails] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/admin/getAllOrders/${currentPage}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const ordersPerPage = 50;
                setOrders(response.data.orders);
                setTotalPages(Math.ceil(response.data.total / ordersPerPage));
            } catch (error) {
                console.error('Błąd podczas pobierania zamówień:', error);
            }
        };
        fetchOrders();
    }, [refresh, currentPage]);

    const handleChangeStatus = async (orderId, newStatus) => {
        try {
            await axios.put(
                `/api/admin/updateOrderStatus/${orderId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Błąd podczas aktualizacji statusu:', error);
        }
    };

    const handleLoadDetails = async (orderId) => {
        if (details[orderId]) {
            setDetails((prev) => ({ ...prev, [orderId]: null }));
            return;
        }
        try {
            const response = await axios.get(`/api/admin/getOrderDetails/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDetails((prev) => ({ ...prev, [orderId]: response.data }));
        } catch (error) {
            console.error('Błąd podczas ładowania szczegółów zamówienia:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className={styles.orderList}>
            <h2 className={styles.title}>Lista zamówień</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Kwota</th>
                    <th>Adres</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <>
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>
                                    {new Date(order.date).toLocaleString('pl-PL', {
                                        year: 'numeric', month: '2-digit', day: '2-digit'
                                    })}
                                </td>
                                <td>{order.status}</td>
                                <td>{(order.price / 100).toFixed(2)} zł</td>
                                <td>
                                    {order.address}, {order.address_city}
                                </td>
                                <td>
                                    <button
                                        className={styles.statusButton}
                                        onClick={() =>
                                            handleChangeStatus(
                                                order.order_id,
                                                order.status !== 'pakowanie' ? order.status !== 'wysłano' ? 'pakowanie' : 'dostarczono' : 'wysłano'
                                            )
                                        }
                                    >
                                        Zmień status
                                    </button>
                                    <button
                                        className={styles.detailsButton}
                                        onClick={() => handleLoadDetails(order.order_id)}
                                    >
                                        {details[order.order_id] ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}
                                    </button>
                                </td>
                            </tr>
                            {details[order.order_id] && (
                                <tr className={styles.detailsRow}>
                                    <td colSpan="6">
                                        <div className={styles.details}>
                                            <h3>Szczegóły zamówienia {order.order_id}</h3>
                                            <ul>
                                                {details[order.order_id].map((product) => (
                                                    <li key={product.product_id}>
                                                        {product.product_name} {product.product_amount}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className={styles.noData}>
                            Brak zamówień.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Poprzednia
                </button>
                <span>
                    Strona {currentPage} z {totalPages}
                </span>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Następna
                </button>
            </div>
        </div>
    );
}

export default OrderList;
