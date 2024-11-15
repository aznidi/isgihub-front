// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Connexion</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
