import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, LogError} from '../ErrorHandler'
import Register from "../components/Register";

describe("Register", () => {
    test("Register form rendered properly", async () => {  
        render(<ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}><Router><Register /></Router></ErrorBoundary>);

        const usernameLabel = screen.getByText(/Username/i);
        const passwordLabel = screen.getByText(/Password/i);
        const fullnameLabel = screen.getByText(/Full Name/i);
        const emailLabel = screen.getByText(/Email/i);
        const phoneLabel = screen.getByText(/Phone/i);
        const countryLabel = screen.getByText(/Country/i);
        const addressLabel = screen.getByText(/Address/i);
        const genderLabels = screen.getAllByText(/Male/i);
        // const femaleLabel = screen.getByText(/Female/i);

        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(fullnameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(phoneLabel).toBeInTheDocument();
        expect(countryLabel).toBeInTheDocument();
        expect(addressLabel).toBeInTheDocument();
        expect(genderLabels[0]).toBeInTheDocument();
        expect(genderLabels[1]).toBeInTheDocument();

        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const fullnameInput = screen.getByLabelText(/Full Name/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const phoneInput = screen.getByLabelText(/Phone/i);
        const countryInput = screen.getByLabelText(/Country/i);
        const addressInput = screen.getByLabelText(/Address/i);
        const genderInputs = screen.getAllByLabelText(/Male/i);
        // const femaleInput = screen.getByLabelText(/Female/i);

        expect(usernameInput.getAttribute("id")).toBe("username");
        expect(passwordInput.getAttribute("id")).toBe("password");
        expect(fullnameInput.getAttribute("id")).toBe("fullname");
        expect(emailInput.getAttribute("id")).toBe("email");
        expect(phoneInput.getAttribute("id")).toBe("phone");
        expect(countryInput.getAttribute("id")).toBe("country");
        expect(addressInput.getAttribute("id")).toBe("address");
        expect(genderInputs[0].getAttribute("id")).toBe("male");
        expect(genderInputs[1].getAttribute("id")).toBe("female");
    });

    test("Register form should accept input", async () => {
        render(<ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}><Router><Register /></Router></ErrorBoundary>);

        const usernameInput = screen.getByLabelText(/Username/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const fullnameInput = screen.getByLabelText(/Full Name/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const phoneInput = screen.getByLabelText(/Phone/i);
        const countryInput = screen.getByLabelText(/Country/i);
        const addressInput = screen.getByLabelText(/Address/i);
        const genderInputs = screen.getAllByLabelText(/Male/i);
        // const femaleInput = screen.getByLabelText(/Female/i);

        expect(usernameInput.value).toMatch("");
        expect(passwordInput.value).toMatch("");
        expect(fullnameInput.value).toMatch("");
        expect(emailInput.value).toMatch("");
        expect(phoneInput.value).toMatch("");
        expect(countryInput.value).toMatch("india");
        expect(addressInput.value).toMatch("");
        expect(genderInputs[0].value).toMatch("male");
        expect(genderInputs[1].value).toMatch("");

        fireEvent.change(usernameInput, { target: { value: "testuser1" } });
        expect(usernameInput.value).toMatch("testuser");

        fireEvent.change(passwordInput, { target: { value: "password" } });
        expect(passwordInput.value).toMatch("password");

        fireEvent.change(fullnameInput, { target: { value: "testuser One" } });
        expect(fullnameInput.value).toMatch("testuser One");

        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        expect(emailInput.value).toMatch("test@test.com");

        fireEvent.change(phoneInput, { target: { value: "1234567890" } });
        expect(phoneInput.value).toMatch("1234567890");

        fireEvent.change(countryInput, { target: { value: "usa" } });
        expect(countryInput.value).toMatch("usa");

        fireEvent.change(addressInput, { target: { value: "123 Abc Rd" } });
        expect(addressInput.value).toMatch("123 Abc Rd");

        fireEvent.change(genderInputs[1], { target: { value: "female" } });
        expect(genderInputs[1].value).toMatch("female");
    });

    test("Register form should be able to submit", async () => {
        render(<ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}><Router><Register /></Router></ErrorBoundary>);
        fireEvent.click(screen.getByText('Register'));
    });

    test('Register form redirect to Login form', async () => {
        render(<ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}><Router><Register /></Router></ErrorBoundary>);

        const closeLink = screen.getByRole('link', { name: 'Close' });
// // console.log(closeLink);
        expect(closeLink).toBeInTheDocument();
        expect(closeLink.getAttribute('href')).toBe('/login');
    });
});