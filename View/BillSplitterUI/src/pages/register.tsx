import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import FormError from '../components/FormError';
import { register } from '../services/authService'; // Assuming this function handles registration

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    try {
      const response = await register(name, email, password); // Assuming register is an async function
      setMessage('Registration successful!');
      console.log('Registration response:', response);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        {error && <FormError message={error} />}
        {message && <div className="text-green-500 text-center mb-4">{message}</div>}
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button text="Register" />
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm">Already have an account? </span>
          <a href="/login" className="text-blue-500 hover:underline">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
