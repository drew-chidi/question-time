import { render, screen, fireEvent } from '@testing-library/react';

import ExistingQuestionsCard from './ExistingQuestionsCard';
import { deleteQuestion, editQuestion } from '@/util/api';

jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
    error: jest.fn(),
}));

jest.mock('../../util/api', () => ({
    deleteQuestion: jest.fn(),
    editQuestion: jest.fn(),
}));

describe('ExistingQuestionsCard', () => {
    const mockQuestion = {
        id: '1',
        question: 'Test Question',
        options: ['Option 1', 'Option 2'],
    };

    test('renders existing question with edit and delete buttons', () => {
        render(<ExistingQuestionsCard data={mockQuestion} />);

        // Assert the existence of question title
        expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();

        // Assert the existence of options
        mockQuestion.options.forEach(option => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });

        // Assert the existence of edit and delete buttons
        expect(screen.getByRole('button', { name: 'Edit question' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Delete question' })).toBeInTheDocument();
    });

    test('triggers editQuestion function when edit button is clicked', async () => {
        render(<ExistingQuestionsCard data={mockQuestion} />);
        const editButton = screen.getByRole('button', { name: 'Edit question' });

        fireEvent.click(editButton);

        // Assert that editQuestion function is called with correct arguments
        expect(editQuestion).toHaveBeenCalledWith(mockQuestion.id, expect.any(Object));
    });

    test('triggers deleteQuestion function when delete button is clicked', async () => {
        render(<ExistingQuestionsCard data={mockQuestion} />);
        const deleteButton = screen.getByRole('button', { name: 'Delete question' });

        fireEvent.click(deleteButton);

        // Assert that deleteQuestion function is called with correct arguments
        expect(deleteQuestion).toHaveBeenCalledWith(mockQuestion.id);
    });
});
