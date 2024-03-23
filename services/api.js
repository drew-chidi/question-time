import axios from 'axios';

const BASE_URL = 'https://qt.organogram.app';
const TOKEN_KEY = 'qt_token';

export const getToken = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/token`, { email });
        const token = response.data.token;
        localStorage.setItem(TOKEN_KEY, token);
        return token;
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
};

export const getQuestions = async () => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await axios.get(`${BASE_URL}/questions`, {
            headers: {
                'Token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};

export const addQuestion = async (questionData) => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await axios.post(`${BASE_URL}/questions`, questionData, {
            headers: {
                'Token': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding question:', error);
        throw error;
    }
};

//  Implement functions for updating and deleting questions
