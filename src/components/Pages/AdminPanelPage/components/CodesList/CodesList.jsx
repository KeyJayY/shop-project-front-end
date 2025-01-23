import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CodesList.module.scss';
import {useAlert} from "@src/AlertContext.jsx"

function CodesList() {
    const [codes, setCodes] = useState([]);
    const [newCode, setNewCode] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const {showAlert} = useAlert();

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const response = await axios.get('/api/admin/getCodes', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCodes(response.data);
            } catch (error) {
                console.error('Error fetching codes:', error);
            }
        };
        fetchCodes();
    }, [refresh]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCode((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewCode = async () => {
        try {
            await axios.post('/api/admin/addNewCode', newCode, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewCode(null);
            setRefresh((prev) => !prev);
        } catch (error) {
            if(error.response.status == 409)
                showAlert("kod o podanej nazwie jest już w bazie danych", "error")
            else
                console.error('Error fetching codes:', error);
        }
    };

    return (
        <div className={styles.codesList}>
            <h2 className={styles.title}>Codes List</h2>
            <button
                className={styles.addButton}
                onClick={() => setNewCode({ code: '', discount_percent: '' })}
            >
                Add New Code
            </button>
            {newCode && (
                <div className={styles.newCodeForm}>
                    <h3>Add New Code</h3>
                    <input
                        type="text"
                        name="code"
                        placeholder="Code"
                        value={newCode.code}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="discount_percent"
                        placeholder="Discount Percent"
                        value={newCode.discount_percent}
                        onChange={handleInputChange}
                        required
                    />
                    <button className={styles.saveButton} onClick={handleAddNewCode}>
                        Save Code
                    </button>
                    <button className={styles.cancelButton} onClick={() => setNewCode(null)}>
                        Cancel
                    </button>
                </div>
            )}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Discount Percent</th>
                    <th>Admin ID</th>
                </tr>
                </thead>
                <tbody>
                {codes.length > 0 ? (
                    codes.map((code) => (
                        <tr key={code.code}>
                            <td>{code.code}</td>
                            <td>{code.discount_percent}</td>
                            <td>{code.admin_id}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className={styles.noData}>
                            No codes found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default CodesList;
