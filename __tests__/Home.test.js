import Home from '@/pages';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getQuestions, addQuestion, deleteQuestion, editQuestion } from '@/util/api';
jest.mock('next/router', () => ({
    useRouter: () => ({ push: jest.fn() })
}));

jest.mock('../utils/api', () => ({
    getQuestions: jest.fn().mockResolvedValue([]),
    addQuestion: jest.fn().mockResolvedValue({}),
    deleteQuestion: jest.fn().mockResolvedValue({}),
    editQuestion: jest.fn().mockResolvedValue({})
}));

describe('HomePage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders HomePage component', () => {
        render(<Home />);
        expect(screen.getByText('Question Management')).toBeInTheDocument();
    });

    test('renders question form', () => {
        render(<Home />);
        expect(screen.getByText('Add New Question')).toBeInTheDocument();
    });

    test('displays existing questions', async () => {
        const mockQuestions = [
            { id: '1', question: 'Test question 1', options: ['Option 1', 'Option 2'] },
            { id: '2', question: 'Test question 2', options: ['Option 3', 'Option 4'] }
        ];
        getQuestions.mockResolvedValueOnce(mockQuestions);
        render(<Home />);
        expect(await screen.findByText('Test question 1')).toBeInTheDocument();
        expect(screen.getByText('Test question 2')).toBeInTheDocument();
    });

    test('deletes a question', async () => {
        const mockQuestions = [{ id: '1', question: 'Test question', options: ['Option 1', 'Option 2'] }];
        getQuestions.mockResolvedValueOnce(mockQuestions);
        render(<Home />);
        const deleteButton = await screen.findByTestId('delete-button-1'); // Assuming each question has a delete button with test ID 'delete-button-{id}'
        fireEvent.click(deleteButton);
        await waitFor(() => expect(deleteQuestion).toHaveBeenCalledWith('1'));
    });

    test('updates a question', async () => {
        const mockQuestions = [{ id: '1', question: 'Test question', options: ['Option 1', 'Option 2'] }];
        getQuestions.mockResolvedValueOnce(mockQuestions);
        render(<Home />);
        const updateButton = await screen.findByTestId('update-button-1'); // Assuming each question has an update button with test ID 'update-button-{id}'
        fireEvent.click(updateButton);
        await waitFor(() => expect(editQuestion).toHaveBeenCalledWith('1', { question: 'Updated question', options: ['Updated Option 1', 'Updated Option 2'] }));
    });
});
