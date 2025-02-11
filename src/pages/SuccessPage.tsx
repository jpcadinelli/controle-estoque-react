import React, { useEffect, useState } from 'react';
import getUsuarioLogadoServices from '../services/getUsuarioLogadoServices';

const SuccessPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<{ primeiroNome: string; ultimoNome: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuario = await getUsuarioLogadoServices.getUsuarioLogado();
                setUsuario(usuario);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Falha ao fazer login. Verifique suas credenciais.');
            }
        };

        fetchData();
    }, []);

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

export default SuccessPage;
