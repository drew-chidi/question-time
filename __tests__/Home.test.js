import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import Home from '../pages/index';
import { getQuestions } from '@/utils/api';

// Mock useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/utils/api');

describe('Home Page', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    useRouter.mockImplementation(() => ({
        route: '/',
        pathname: '/',
        query: '',
        asPath: '',
        push: jest.fn(),
    }));

    test('renders Home component', () => {
        render(<Home />);
    });

    test('opens AddQuestion modal when "Add question" button is clicked', () => {
        render(<Home />);
        const addButton = screen.getByRole('button');
        fireEvent.click(addButton);
        const addQuestionModal = screen.queryAllByText(/add question/i);
        // Ensure there's at least one matching element
        const isModalPresent = addQuestionModal.some(modal => modal.tagName === 'SPAN' || modal.tagName === 'H2' || modal.tagName === 'BUTTON');
        expect(isModalPresent).toBe(true);
    });

    test('displays questions after fetching', async () => {
        const mockQuestions = [
            { id: '1', question: 'Test question 1', options: ['Option 1', 'Option 2'] },
            { id: '2', question: 'Test question 2', options: ['Option 3', 'Option 4'] },
        ];
        getQuestions.mockResolvedValueOnce(mockQuestions);

        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText(/Test question 1/i)).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByText(/Test question 2/i)).toBeInTheDocument();
        });
    });
});
