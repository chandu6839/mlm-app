import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    sponsorId: '',
    placement: 'auto', // 'auto', 'left', or 'right'
    fullName: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [sponsorInfo, setSponsorInfo] = useState(null);
  const [isCheckingSponsor, setIsCheckingSponsor] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear sponsor info when sponsor ID changes
    if (name === 'sponsorId') {
      setSponsorInfo(null);
    }
  };

  const checkSponsor = () => {
    if (!formData.sponsorId) {
      setError('Please enter a sponsor ID');
      return;
    }

    setIsCheckingSponsor(true);
    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const sponsor = users.find(user => user.username === formData.sponsorId);

    if (sponsor) {
      setSponsorInfo(sponsor);
      setError('');
    } else if (formData.sponsorId === 'demo') {
      setSponsorInfo({
        username: 'demo',
        fullName: 'Demo User',
      });
      setError('');
    } else {
      setError('Sponsor ID not found');
      setSponsorInfo(null);
    }
    setIsCheckingSponsor(false);
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.sponsorId) {
      setError('Sponsor ID is required');
      return false;
    }
    if (!sponsorInfo) {
      setError('Please verify your sponsor ID first');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // For demo purposes, store in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(user => user.username === formData.username)) {
        setError('Username already exists');
        return;
      }
      if (users.some(user => user.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        sponsorId: formData.sponsorId,
        placement: formData.placement,
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        joinDate: new Date().toISOString(),
        status: 'pending',
        rank: 'New',
        earnings: 0,
        network: {
          left: null,
          right: null,
        },
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      navigate('/login');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Register New Account
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <TextField
                required
                fullWidth
                name="sponsorId"
                label="Sponsor ID"
                id="sponsorId"
                value={formData.sponsorId}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                onClick={checkSponsor}
                disabled={isCheckingSponsor || !formData.sponsorId}
              >
                {isCheckingSponsor ? <CircularProgress size={24} /> : 'Verify'}
              </Button>
            </Box>
            {sponsorInfo && (
              <Alert severity="success" sx={{ mt: 1 }}>
                Sponsor verified: {sponsorInfo.fullName || sponsorInfo.username}
              </Alert>
            )}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Placement Preference</InputLabel>
              <Select
                value={formData.placement}
                label="Placement Preference"
                name="placement"
                onChange={handleChange}
              >
                <MenuItem value="auto">Auto Placement</MenuItem>
                <MenuItem value="left">Left Team</MenuItem>
                <MenuItem value="right">Right Team</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="address"
              label="Address"
              id="address"
              multiline
              rows={2}
              value={formData.address}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register; 