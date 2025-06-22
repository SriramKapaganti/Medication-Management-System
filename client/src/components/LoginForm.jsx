import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BackgroundImage, FormBox, InputBox, InputContainer, Label, SignUpButton, LoginButton, FormMessage, Logo } from '../components/DesignLayout';

function LoginForm({onLogin}) {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = event => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData, {
        withCredentials: true
      });
       const userRes = await axios.get('http://localhost:5000/api/auth/me', {
        withCredentials: true
      });

      onLogin(userRes.data.user);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <BackgroundImage>
      <FormBox onSubmit={handleSubmit}>
        <Logo src='/Logo.png' alt='Logo' />
        <InputContainer>
          <Label htmlFor="username">Username</Label>
          <InputBox type="text" id="username" name="username" onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">Password</Label>
          <InputBox type="password" id="password" name="password" onChange={handleChange} />
        </InputContainer>
        <LoginButton type="submit">Login</LoginButton>
        <SignUpButton onClick={() => navigate('/signup')}>SignUp</SignUpButton>
        <FormMessage>{message}</FormMessage>
      </FormBox>
    </BackgroundImage>
  );
}

export default LoginForm;
