import axios from 'axios';

const BASE_URL = 'https://backend-bfhl.onrender.com/bfhl';

export const postData = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data);
        return response.data;
    } catch (error) {
        // You can also log the error to the console for debugging
        console.error('Error posting data:', error);
        throw new Error(error.response ? error.response.data.error : error.message);
    }
};
