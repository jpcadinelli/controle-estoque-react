import React, { useEffect, useState } from 'react';
import getUsuarioLogadoServices from '../services/getUsuarioLogadoServices';
import {useNavigate} from "react-router-dom";

const DashboardPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<{ primeiroNome: string; ultimoNome: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuario = await getUsuarioLogadoServices.getUsuarioLogado();
                setUsuario(usuario);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                navigate('/');
                setError('Token inválido, faça login novamente.'); //como mando esse erro para a tela de login?
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="success-container">
            <h1>Login bem-sucedido!</h1>
            {usuario && (
                <p>Bem-vindo à aplicação, {usuario.primeiroNome} {usuario.ultimoNome}.</p>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default DashboardPage;
