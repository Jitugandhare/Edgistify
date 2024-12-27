import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
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
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 12px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
