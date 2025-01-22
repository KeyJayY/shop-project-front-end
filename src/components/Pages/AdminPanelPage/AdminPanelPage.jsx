import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPanelPage() {
    const [adminData, setAdminData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        } else {
            axios.get('/admin/check-token', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => setAdminData(response.data));
        }
    }, [navigate]);

    return (
        <div>
            <h2>Admin Panel</h2>
            {adminData ? (
                <div>
                    <p>Witaj</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default AdminPanelPage;
