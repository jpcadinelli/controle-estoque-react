import React, { useState } from 'react';
import authService from '../services/authServices';
import './LoginPage.css';
import Cookies from 'js-cookie'

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const token = await authService.login(email, password);
            Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' });
            window.location.href = '/success';
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Falha ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="login-form">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button onClick={handleLogin} type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginPage;
