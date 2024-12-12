import Header from './Header.jsx';
import {useState, useEffect} from "react";
import axios from 'axios';
import {useAuth} from "./AuthProvider.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import Cart from "./Cart";
import stylesUserPage from "./UserPage.module.scss"


function UserPage() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, loading: authLoading } = useAuth();
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
        return <Navigate to={"/"} />;
    }



    return (
        <>
            <Header userBar={false}/>
            <header className={stylesUserPage.header}>
                {`panel użytkownika ${data.email}`}
            </header>
            <main className={stylesUserPage.userPanel}>

                <div className={stylesUserPage.userDetails}>
                    <p><strong>imie: </strong>{data.first_name}</p>
                    <p><strong>nazwisko: </strong>{data.last_name}</p>
                    <p><strong>miasto: </strong>{data.address_city}</p>
                    <p><strong>adres: </strong>{data.address}</p>
                    <p><strong>data urodzenia: </strong>{new Intl.DateTimeFormat('pl-PL', {day: "2-digit", month: "2-digit", year: "numeric"}).format(new Date(data.birth_date))}</p>
                    <button className={stylesUserPage.editButton}>Edytuj</button>
                </div>
                <Cart />
            </main>
        </>
    );
}

export default UserPage;