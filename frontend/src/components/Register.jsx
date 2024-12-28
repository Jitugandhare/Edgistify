import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') {
      setEmailError('');
    }
    if (e.target.name === 'password') {
      setPasswordError('');
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setEmailError('');
    setPasswordError('');

    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address only @gmail.com or @yahoo.com.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('https://backend-g6ct.onrender.com/auth/register', formData);
      setSuccess('Registration successful!');
      setFormData({ fullName: '', email: '', password: '' });
      setTimeout(() => {
        navigate('/login');  
      }, 2000);  
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Register</FormTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <Input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {emailError && <ErrorContainer>{emailError}</ErrorContainer>}

      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {passwordError && <ErrorContainer>{passwordError}</ErrorContainer>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </FormContainer>
  );
};

export default Register;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  
  @media (max-width: 480px) {
    max-width: 90%;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  font-size: 26px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 15px;
  margin: 12px 0;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 16px;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #007bff;
    background-color: #fff;
  }

  @media (max-width: 480px) {
    padding: 14px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 14px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;

const ErrorContainer = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 12px;
  text-align: left;
`;
