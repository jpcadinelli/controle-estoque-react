import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

export const getUsuarioLogado = async () => {
    const retrievedToken: string | undefined = Cookies.get('token');
    if (!retrievedToken) {
        throw new Error('Token não encontrado');
    }
    try {
        const response = await api.get('/usuarios/logado', {
            headers: {
                Authorization: `Bearer ${retrievedToken}`
            }
        });
        console.log('Resposta do backend:', response.data);
        return response.data.data;
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error('Erro na requisição:', err.response?.data || err.message);
        throw err;
    }
};

export default {
    getUsuarioLogado,
};