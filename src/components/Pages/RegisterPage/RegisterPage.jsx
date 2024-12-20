import Header from '@components/Layout/Header';
import stylesRegisterPage from './RegisterPage.module.scss'
import {useState} from 'react';
import axios from "axios";
import FormGroup from "@components/Common/FormGroup";

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
                <div className={stylesRegisterPage.registrationContainer}>
                    <form onSubmit={handleSubmit} className={stylesRegisterPage.registrationForm}>
                        <h1 className={stylesRegisterPage.formTitle}>Rejestracja</h1>
                        <FormGroup name="firstName" type="text" label="imie" value={formData.firstName} onChange={handleChange} />
                        <FormGroup name="lastName" type="text" label="Nazwisko" value={formData.lastName} onChange={handleChange} />
                        <FormGroup name="email" type="email" label="email" value={formData.email} onChange={handleChange} />
                        <FormGroup name="address" type="text" label="addres" value={formData.address} onChange={handleChange} />
                        <FormGroup name="city" type="text" label="miasto" value={formData.city} onChange={handleChange} />
                        <FormGroup name="dateOfBirth" type="date" label="data urodzenia" value={formData.dateOfBirth} onChange={handleChange} />
                        <FormGroup name="password" type="password" label="hasło" value={formData.password} onChange={handleChange} />
                        <FormGroup name="confirmPassword" type="password" label="potwierdź hasło" value={formData.confirmPassword} onChange={handleChange} />
                        <input type="submit" className={stylesRegisterPage.submitButton}/>
                    </form>
                </div>
            </main>
        </>
    )
}

export default RegisterPage;