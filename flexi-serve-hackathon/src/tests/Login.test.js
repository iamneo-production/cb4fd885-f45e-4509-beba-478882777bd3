import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, LogError} from '../ErrorHandler'
import Login, { validate } from "../components/Login";

describe("Login", () => {
    test("Login form rendered properly", async () => {
        render(<ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}><Router><Login /></Router></ErrorBoundary>);

        const usernameLabel = screen.getByText(/Username/i);
        const passwordLabel = screen.getByText(/Password/i);

        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();

        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        expect(usernameInput.getAttribute("id")).toBe("username");
        expect(passwordInput.getAttribute("id")).toBe("password");

        expect(usernameInput.getAttribute("type")).toBe("text");
        expect(passwordInput.getAttribute("type")).toBe("password");
    });

    test("Validate function should fail on incorrect input", () => {
        expect(validate("", "")).not.toBe(true);
        expect(validate(null, null)).not.toBe(true);
    });

    test("Validate function should succeed on correct input", () => {
        expect(validate("test", "test")).toBe(true);
    });

    test("Login form should accept input", async () => {
        render(<ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}><Router><Login /></Router></ErrorBoundary>);

        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        expect(usernameInput.value).toMatch("");
        expect(passwordInput.value).toMatch("");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        expect(usernameInput.value).toMatch("testuser");

        fireEvent.change(passwordInput, { target: { value: "password" } });
        expect(passwordInput.value).toMatch("password");
    });

    test("Login form should be able to submit", async () => {
        render(<ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}><Router><Login /></Router></ErrorBoundary>);
        fireEvent.click(screen.getByText('Login'));
    });

    test('Login form redirect to Register form', async () => {
        render(<ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}><Router><Login /></Router></ErrorBoundary>);

        const registerLink = screen.getByRole('link', { name: 'New User' });
// // console.log(closeLink);
        expect(registerLink).toBeInTheDocument();
        expect(registerLink.getAttribute('href')).toBe('/register');
    });
});