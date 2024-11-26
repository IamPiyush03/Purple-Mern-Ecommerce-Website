import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const endpoint = isAdminLogin
        ? 'https://purple-mern-ecommerce-website.onrender.com/api/auth/admin-login'
        : 'https://purple-mern-ecommerce-website.onrender.com/api/auth/login';
      const response = await axios.post(endpoint, { email, password });
  
      if (response.data.token) {
        const tokenKey = isAdminLogin ? 'adminToken' : 'authToken';
        localStorage.setItem(tokenKey, response.data.token);
        const redirectPath = isAdminLogin ? '/admin-dashboard' : '/'; // Ensure this path exists
        navigate(redirectPath);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      setErrorMessage(message);
      setOpenSnackbar(true);
    }
  };
  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      setErrorMessage('Passwords do not match');
      setOpenSnackbar(true);
      return;
    }
  
    // Additional validation (optional)
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setOpenSnackbar(true);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        fullName,
        email,
        password,
      });
  
      if (response.status === 201) {
        setErrorMessage('Registration successful! Please log in.');
        setOpenSnackbar(true);
        setIsRegister(false); // Potentially redirect after a timeout
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #667eea, #764ba2)',
        padding: 3,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
            {isRegister ? 'Register' : isAdminLogin ? 'Admin Login' : 'User Login'}
          </Typography>

          {/* Login Form */}
          {!isRegister && (
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button variant="contained" color="primary" fullWidth type="submit">
                {isAdminLogin ? 'Login as Admin' : 'Login'}
              </Button>
              <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                {!isAdminLogin && (
                  <>
                    Don't have an account?{' '}
                    <span
                      style={{ color: '#667eea', cursor: 'pointer' }}
                      onClick={() => setIsRegister(true)}
                    >
                      Register
                    </span>
                    <br />
                    Admin?{' '}
                  </>
                )}
                <span
                  style={{ color: '#667eea', cursor: 'pointer' }}
                  onClick={() => setIsAdminLogin(!isAdminLogin)}
                >
                  {isAdminLogin ? 'Back to User Login' : 'Login as Admin'}
                </span>
              </Typography>
            </form>
          )}

          {/* Registration Form */}
          {isRegister && (
            <form onSubmit={handleRegister}>
              <TextField
                label="Full Name"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                label="Repeat Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                required
              />
              <Button variant="contained" color="primary" fullWidth type="submit">
                Register
              </Button>
              <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
                Already have an account?{' '}
                <span
                  style={{ color: '#667eea', cursor: 'pointer' }}
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </span>
              </Typography>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
