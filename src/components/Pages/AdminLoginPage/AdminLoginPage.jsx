import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLoginPage.module.scss';

function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/admin/login', { username, password });
            if (response.data.success) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/adminPanel');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className={styles.loginPage}>
            <h2 className={styles.title}>Login to Admin Panel</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
        </div>
    );
}

export default AdminLoginPage;
