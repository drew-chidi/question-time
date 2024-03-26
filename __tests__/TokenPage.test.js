import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import { getToken } from '@/utils/api';
import TokenPage from '@/pages/token';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/utils/api');

describe('TokenPage Component', () => {
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

    test('renders TokenPage component', () => {
        render(<TokenPage />);
        expect(screen.getByText(/Retrieve Your Token/i)).toBeInTheDocument();
    });

    test('entering email address', () => {
        render(<TokenPage />);
        const emailInput = screen.getByPlaceholderText('Enter your email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
    });

    test('clicking Retrieve Token button', async () => {
        render(<TokenPage />);
        const retrieveTokenButton = screen.getByText(/Retrieve Token/i);
        fireEvent.click(retrieveTokenButton);
        expect(getToken).toHaveBeenCalledTimes(1);
    });

    test('token retrieval', async () => {
        const mockToken = 'mockToken';
        getToken.mockResolvedValueOnce(mockToken);
        render(<TokenPage />);
        const emailInput = screen.getByPlaceholderText('Enter your email');
        const retrieveTokenButton = screen.getByText(/Retrieve Token/i);
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(retrieveTokenButton);
        await waitFor(() => {
            expect(getToken).toHaveBeenCalledWith('test@example.com');
        });
    });

    test('loading state', () => {
        render(<TokenPage />);
        const retrieveTokenButton = screen.getByText(/Retrieve Token/i);
        fireEvent.click(retrieveTokenButton);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('token retrieval success', async () => {
        const mockToken = 'mockToken';
        getToken.mockResolvedValueOnce(mockToken);
        const pushMock = jest.fn();
        useRouter.mockImplementation(() => ({
            push: pushMock,
        }));
        render(<TokenPage />);
        const retrieveTokenButton = screen.getByText(/Retrieve Token/i);
        fireEvent.click(retrieveTokenButton);
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith('/');
        });
    });

    test('token retrieval failure', async () => {
        const errorMessage = 'Error retrieving token:';
        getToken.mockRejectedValueOnce(new Error(errorMessage));
        render(<TokenPage />);
        const retrieveTokenButton = screen.getByText(/Retrieve Token/i);
        fireEvent.click(retrieveTokenButton);
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
