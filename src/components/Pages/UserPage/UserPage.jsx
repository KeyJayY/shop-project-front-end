import Header from '../../Layout/Header';
import {useState, useEffect} from "react";
import axios from 'axios';
import {useAuth} from "../../../AuthProvider.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import Cart from "./components/Cart";
import stylesUserPage from "./UserPage.module.scss"
import History from "./components/History";


function UserPage() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const {isAuthenticated, loading: authLoading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`/api/UserData`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (e) {
                console.error(e);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || authLoading)
        return <>loading...</>;

    if (!isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const result = await axios.put("/api/changeUserData", editedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return (
        <>
            <Header userBar={false}/>
            <main className={stylesUserPage.userPanel}>
                <header className={stylesUserPage.header}>
                    {`panel użytkownika ${data.email}`}
                </header>
                <div className={stylesUserPage.content}>
                    <div className={stylesUserPage.userDetails}>
                        <p><strong>imie: </strong>{editing ?
                            <input type={"text"} name="first_name" value={editedData.first_name}
                                   onChange={handleInputChange}/> : data.first_name}</p>
                        <p><strong>nazwisko: </strong>{editing ?
                            <input type={"text"} name="last_name" value={editedData.last_name}
                                   onChange={handleInputChange}/> : data.last_name}</p>
                        <p><strong>miasto: </strong>{editing ?
                            <input type={"text"} name="address_city" value={editedData.address_city}
                                   onChange={handleInputChange}/> : data.address_city}</p>
                        <p><strong>adres: </strong>{editing ? <input type={"text"} name="address" value={editedData.address}
                                                                     onChange={handleInputChange}/> : data.address}</p>
                        <p><strong>data urodzenia: </strong>{editing ?
                            <input type={"date"} name="birth_date"
                                   value={new Date(editedData.birth_date).toISOString().split('T')[0]}
                                   onChange={handleInputChange}/> : new Intl.DateTimeFormat('pl-PL', {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            }).format(new Date(data.birth_date))}</p>
                        {editing ? <>
                                <button className={stylesUserPage.editButton} onClick={handleSave}>Zapisz</button>
                                <button className={stylesUserPage.editButton} onClick={() => {
                                    setEditing(false)
                                }}>Anuluj
                                </button>
                            </>
                            : <button className={stylesUserPage.editButton} onClick={() => {
                                setEditing(!editing)
                                setEditedData(data)
                            }}>Edytuj</button>}
                    </div>
                    <Cart address={data.address} city={data.address_city}/>
                </div>
                <History/>
            </main>
        </>
    );
}

export default UserPage;