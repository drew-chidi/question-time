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
        throw error;
    }
};

export const editQuestion = async (questionId, updatedQuestionData) => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await axios.put(`${BASE_URL}/questions/${questionId}`, updatedQuestionData, {
            headers: {
                'Token': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteQuestion = async (questionId) => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await axios.delete(`${BASE_URL}/questions/${questionId}`, {
            headers: {
                'Token': token
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};