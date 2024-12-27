import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

   
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Email must be from gmail.com or yahoo.com';
    }

   
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }

    try {
      const res = await axios.post('http://localhost:8000/auth/login', formData);
      alert('Login Successful');
      navigate('/home');  
    } catch (err) {
      console.error(err);
      alert('Login Failed');
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <FormTitle>Login</FormTitle>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <ErrorText>{errors.email}</ErrorText>}
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}
      <SubmitButton type="submit">Login</SubmitButton>
    </LoginForm>
  );
};

export default Login;

const LoginForm = styled.form`
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

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 14px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
`;
