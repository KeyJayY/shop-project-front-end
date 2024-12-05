import Header from './Header';
import stylesLoginPage from './LoginPage.module.scss'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider.jsx';
import { Navigate } from "react-router-dom";
import {verifyToken} from "./verifyToken.js";


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, login, logout } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/"/>;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', {
                username,
                password,
            });
            login(response.data.token);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header userBar={false}/>
            <main className={stylesLoginPage.main}>
                <div className={stylesLoginPage.loginBox}>
                    <form onSubmit={handleLogin}>
                        <div>
                            <input
                                type="text"
                                placeholder="Nazwa użytkownika"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="username">username</label>
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">password</label>
                        </div>
                        <input type="submit"/>
                    </form>
                </div>
            </main>
        </>
    )
}

export default LoginPage;