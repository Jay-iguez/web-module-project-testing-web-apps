import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />)
});

test('renders the contact form header', () => {
    render(<ContactForm />)
    const contactHeader = screen.getByText('Contact Form')

    expect(contactHeader).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByText('First Name*')
    const firstNameInput = screen.getByPlaceholderText('Edd')

    userEvent.type(firstNameInput, 'Jayd')

    const firstNameError = screen.getByText(/Error: firstName must have at least 5 characters./i)
    expect(firstName).toBeInTheDocument()
    expect(firstNameError).toBeInTheDocument()
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByText('First Name*')
    const firstNameInput = screen.getByPlaceholderText('Edd')
    const lastName = screen.getByText('Last Name*')
    const lastNameInput = screen.getByPlaceholderText('Burke')
    const email = screen.getByText('Email*')
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com')

    userEvent.type(firstNameInput, 'J')
    userEvent.clear(firstNameInput)
    userEvent.type(lastNameInput, 'A')
    userEvent.clear(lastNameInput)
    userEvent.type(emailInput, 'N')
    userEvent.clear(emailInput)

    const firstNameError = screen.getByText(/Error: firstName must have at least 5 characters./i)
    const lastNameError = screen.getByText(/Error: lastName is a required field./i)
    const emailError = screen.getByText(/Error: email must be a valid email address./i)
    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(firstNameError).toBeInTheDocument()
    expect(lastNameError).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
