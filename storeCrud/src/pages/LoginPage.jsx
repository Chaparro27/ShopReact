import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/productslist');
  }, [isAuthenticated]);

  return (
    <Container
      maxWidth="xs"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <AccountCircleIcon sx={{ fontSize: 100, color: 'primary' }} /> WELCOME
          </Typography>
          {signinErrors.map((error, i) => (
            <Alert key={i} severity="error">
              {error}
            </Alert>
          ))}
          <form onSubmit={onSubmit}>
            <TextField
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register('username', { required: true })}
            />
            {errors.password && <p style={{ color: 'red' }}>Password is required</p>}
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              {...register('password', { required: true })}
            />
            <Button variant="contained" color="primary" fullWidth onClick={onSubmit} type="submit">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;