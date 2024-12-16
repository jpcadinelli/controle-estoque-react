import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/login/', {
            email,
            password,
        });
        console.log('Resposta do backend:', response.data);
        return response.data;
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error('Erro na requisição:', err.response?.data || err.message);
        throw err;
    }
};

export default {
    login,
};
