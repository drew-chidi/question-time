import axios from 'axios';
import { getToken, getQuestions, addQuestion, deleteQuestion, editQuestion } from './api';

jest.mock('axios');

describe('API Functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getToken function should return token', async () => {
        const email = 'test@example.com';
        const token = 'test_token';
        axios.post.mockResolvedValueOnce({ data: { token } });
        const result = await getToken(email);
        expect(result).toEqual(token);
    });

    test('getQuestions function should return questions', async () => {
        const questions = [{ id: '1', question: 'Test question', options: ['Option 1', 'Option 2'] }];
        axios.get.mockResolvedValueOnce({ data: questions });
        const result = await getQuestions();
        expect(result).toEqual(questions);
    });

    test('addQuestion function should successfully add question', async () => {
        const questionData = { question: 'New question', options: ['Option 1', 'Option 2'] };
        axios.post.mockResolvedValueOnce({});
        await addQuestion(questionData);
        expect(axios.post).toHaveBeenCalledWith(expect.any(String), questionData, expect.any(Object));
    });

    test('deleteQuestion function should successfully delete question', async () => {
        const questionId = '1';
        axios.delete.mockResolvedValueOnce({});
        await deleteQuestion(questionId);
        expect(axios.delete).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    });

    test('editQuestion function should successfully update question', async () => {
        const questionId = '1';
        const updatedData = { question: 'Updated question', options: ['Updated Option 1', 'Updated Option 2'] };
        axios.put.mockResolvedValueOnce({});
        await editQuestion(questionId, updatedData);
        expect(axios.put).toHaveBeenCalledWith(expect.any(String), updatedData, expect.any(Object));
    });
});
