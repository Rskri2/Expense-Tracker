# Expense Tracker App

## Overview

The Expense Tracker App is a full-stack application designed to help users track their expenses and manage their budget effectively. It is built using React for the front-end and Node.js for the back-end, providing a seamless user experience and a robust server-side application.

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Expense Management**: Add, edit, and delete expenses.
- **Categories**: Categorize expenses to get better insights.
- **Expense Summary**: View summary and statistics of expenses.
- **Responsive Design**: Works on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, Bootstrap (optional)
- **Database**: MongoDB

## Installation

### Frontend

1. Navigate to the `frontend` directory:
   
   cd frontend
   npm start
1. Navigate to the `backend` directory:
   
   cd backend
   npm start
   npm install
   
3.Create a .env file in the backend directory.
    Add the following variables:
   PORT=5000
   NODE_ENV=production
   DATABASE=your_mongodb_connection_string
   DATABASE_PASSWORD=your_mongodb_connection_string_password
   JWT_SECRET=your_jwt_secret
   JWT_COOKIE_EXPIRES_IN=10

3.Usage
    Register an Account: Go to the registration page and create a new account.
    Log In: Use your credentials to log in.
    Track Expenses: Add and manage your expenses from the dashboard.
    View Summary: Access your expense summary to see overall spending.