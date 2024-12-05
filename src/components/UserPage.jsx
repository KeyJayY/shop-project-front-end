import Header from './Header.jsx';
import {useState, useEffect} from "react";
import axios from 'axios';
import {useAuth} from "./AuthProvider.jsx";
import {Navigate, useNavigate} from "react-router-dom";

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
            <main>
                <header>
                    <h1>{`panel użytkownika ${data.email}`}</h1>
                </header>
                <article>
                    <div>{`imie: ${data.first_name}`}</div>
                    <div>{`nazwisko: ${data.last_name}`}</div>
                    <div>{`miasto: ${data.address_city}`}</div>
                    <div>{`adres: ${data.address}`}</div>
                    <div>{`data urodzenia: ${new Intl.DateTimeFormat('pl-PL', {day: "2-digit", month: "2-digit", year: "numeric"}).format(new Date(data.birth_date))}`}</div>
                </article>
                <div></div>
            </main>
        </>
    );
}

export default UserPage;