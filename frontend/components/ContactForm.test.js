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
    render(<ContactForm />)
    const firstName = screen.getByText('First Name*')
    const firstNameInput = screen.getByPlaceholderText('Edd')
    const lastName = screen.getByText('Last Name*')
    const lastNameInput = screen.getByPlaceholderText('Burke')
    const email = screen.getByText("Email*")
    const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com")

    userEvent.type(firstNameInput, 'Jayden')
    userEvent.type(lastNameInput, 'Rodriguez')
    userEvent.type(emailInput, 'D')
    userEvent.clear(emailInput)

    const emailError = screen.getByText(/Error: email must be a valid email address./i)
    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByText('Email*')
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com')

    userEvent.type(emailInput, 'nullmaildotcom')
    
    const emailError = screen.getByText(/Error: email must be a valid email address./i)
    expect(email).toBeInTheDocument()
    expect(emailError).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const lastName = screen.getByText("Last Name*")
    const submit = screen.getByText('Submit')

    userEvent.click(submit)

    const lastNameError = screen.getByText(/Error: lastName is a required field/i)
    expect(lastName).toBeInTheDocument()
    expect(submit).toBeInTheDocument()
    expect(lastNameError).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByPlaceholderText('Edd')
    const lastNameInput = screen.getByPlaceholderText('Burke')
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com')
    const submit = screen.getByText('Submit')

    userEvent.type(firstNameInput, 'Ethan')
    userEvent.type(lastNameInput, 'Winters')
    userEvent.type(emailInput, 'ILoveMia@aol.com')
    userEvent.click(submit)

    const appendedFirstName = screen.getByTestId('firstnameDisplay')
    const appendedLastName = screen.getByTestId('lastnameDisplay')
    const appendedEmail = screen.getByTestId('emailDisplay')
    expect(appendedFirstName).toBeInTheDocument()
    expect(appendedLastName).toBeInTheDocument()
    expect(appendedEmail).toBeInTheDocument()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstNameInput = screen.getByPlaceholderText('Edd')
    const lastNameInput = screen.getByPlaceholderText('Burke')
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com')
    const messageInput = screen.getByRole('textbox', {name: /message/i})
    const submit = screen.getByText('Submit')

    userEvent.type(firstNameInput, 'Chris')
    userEvent.type(lastNameInput, 'Redfield')
    userEvent.type(emailInput, 'BoulderShoulders@yahoo.com')
    userEvent.type(messageInput, 'They need to do my character justice bro.')
    userEvent.click(submit)

    const appendedFirstName = screen.getByTestId('firstnameDisplay')
    const appendedLastName = screen.getByTestId('lastnameDisplay')
    const appendedEmail = screen.getByTestId('emailDisplay')
    const appendedMessage = screen.getByTestId('messageDisplay')
    expect(appendedFirstName).toBeInTheDocument()
    expect(appendedLastName).toBeInTheDocument()
    expect(appendedEmail).toBeInTheDocument()
    expect(appendedMessage).toBeInTheDocument()
});
