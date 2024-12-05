import Header from './Header';
import stylesRegisterPage from './RegisterPage.module.scss'
import {useState} from 'react';
import axios from "axios";

function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {confirmPassword, ...dataToSend} = formData;
        if (formData.password === formData.confirmPassword) {
            const result = await axios.post("/register", dataToSend);
        }
    }

    return (
        <>
            <Header userBar={false}/>
            <main className={stylesRegisterPage.main}>
                <div className={stylesRegisterPage.registerBox}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" name="firstName" id="firstName" placeholder="firstName"
                                   value={formData.firstName} onChange={handleChange}/>
                            <label htmlFor="firstName">first name</label>
                        </div>
                        <div>
                            <input type="text" name="lastName" id="lastName" placeholder="lastName"
                                   value={formData.lastName} onChange={handleChange}/>
                            <label htmlFor="lastName">last name</label>
                        </div>
                        <div>
                            <input type="text" name="email" id="email" placeholder="email" value={formData.email}
                                   onChange={handleChange}/>
                            <label htmlFor="email">email</label>
                        </div>
                        <div>
                            <input type="text" name="address" id="address" placeholder="address"
                                   value={formData.address}
                                   onChange={handleChange}/>
                            <label htmlFor="address">address</label>
                        </div>
                        <div>
                            <input type="text" name="city" id="city" placeholder="city" value={formData.city}
                                   onChange={handleChange}/>
                            <label htmlFor="city">city</label>
                        </div>
                        <div>
                            <input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="date of birth"
                                   value={formData.dateOfBirth} onChange={handleChange}/>
                            <label htmlFor="dateOfBirth">city</label>
                        </div>
                        <div>
                            <input type="password" name="password" id="password" placeholder="Password"
                                   value={formData.password} onChange={handleChange}/>
                            <label htmlFor="password">password</label>
                        </div>
                        <div>
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="password"
                                   value={formData.confirmPassword} onChange={handleChange}/>
                            <label htmlFor="confirmPassword">confirm password</label>
                        </div>
                        <input type="submit"/>
                    </form>
                </div>
            </main>
        </>
    )
}

export default RegisterPage;