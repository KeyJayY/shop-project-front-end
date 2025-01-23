import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UsersList.module.scss';

function UsersList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 50; // Number of users per page

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('adminToken'); // Get admin token
            if (!token) {
                console.error('Admin token is missing!');
                return;
            }

            try {
                const response = await axios.get(`/api/admin/getUsers/${currentPage}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data.users);
                setTotalPages(Math.ceil(response.data.total / pageSize));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('pl-PL', options).format(new Date(dateString));
    };

    return (
        <div className={styles.usersList}>
            <h2 className={styles.title}>Users List</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Address City</th>
                    <th>Birth Date</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.address_city}</td>
                            <td>{formatDate(user.birth_date)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className={styles.noData}>
                            No users found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.pageButton}
                >
                    Previous
                </button>
                <span className={styles.pageInfo}>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.pageButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UsersList;
