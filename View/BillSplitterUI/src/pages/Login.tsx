import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormError from '../components/FormError';
import { login, logout } from '../services/authService.ts';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = sessionStorage.getItem('jwtToken');
  useEffect(() => {
    if (token) {
      navigate('/');  // Redirect to home page if token exists
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email || !password) {
    setError('Please fill in all fields.');
  } else {
    setError('');
    try {
      const data = await login(email, password); 
      sessionStorage.setItem('jwtToken', data.token);
      navigate('');
      } 
  catch (err) {
      setError('Unknown error');
    }
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-coloe:gray-100">Login</h2>
        {error && <FormError message={error} />}
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button text="Log In" onClick={handleSubmit} />
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account? </span>
          <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
