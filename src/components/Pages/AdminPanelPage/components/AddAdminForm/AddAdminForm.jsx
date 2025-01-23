import { useState } from 'react';
import axios from 'axios';
import styles from './AddAdminForm.module.scss';

function AddAdminForm() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const token = localStorage.getItem('adminToken');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!formData.username || !formData.password) {
            setError('Both fields are required.');
            return;
        }

        try {
            await axios.post('/api/admin/addNewAdmin', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess(true);
            setFormData({ username: '', password: '' });
        } catch (err) {
            console.error('Error adding admin:', err);
            setError('Failed to add new admin. Please try again.');
        }
    };

    return (
        <div className={styles.addAdminForm}>
            <h2 className={styles.title}>Add New Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Nazwa"
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Hasło"
                        required
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>Udało się dodać!</p>}
                <button type="submit" className={styles.submitButton}>
                    Dodaj admina
                </button>
            </form>
        </div>
    );
}

export default AddAdminForm;
